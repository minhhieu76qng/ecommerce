const router = require('express').Router();
const httpCode = require('http-status-codes');
const passport = require('passport');
const userService = require('@services/UserService.js');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
        errors: [
          {
            code: 'INTERNAL_ERROR',
            message: 'Unable to login right now!',
          },
        ],
      });
    }

    if (!user) {
      return res.status(httpCode.BAD_REQUEST).json({
        errors: [
          {
            code: 'INVALID',
            message: info.message,
          },
        ],
      });
    }

    // generate token
    const token = userService.generateToken(user);
    return res.status(httpCode.OK).json({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  })(req, res, next);
});

router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [
        {
          code: 'MISSING',
          message: 'Fields are required!',
        },
      ],
    });
  }

  // VALID EMAIL
  if (!userService.isValidEmail(email)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [
        {
          code: 'INVALID',
          message: 'Email is not valid!',
        },
      ],
    });
  }

  try {
    const isExist = await userService.isEmailExist(email);

    if (isExist) {
      return res.status(httpCode.CONFLICT).json({
        errors: [
          {
            code: 'EXIST',
            message: 'Email is already exist!',
            email,
          },
        ],
      });
    }

    const result = await userService.createUser(name, email, password);

    if (!result) {
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
        errors: [
          {
            code: 'INTERNAL_ERROR',
            message: 'Unable to create user right now!',
          },
        ],
      });
    }

    return res.status(httpCode.CREATED).json({
      user: {
        id: result._id,
        email: result.email,
        name: result.name,
      },
      success: {
        message: 'Create user successfully!',
      },
    });
  } catch (err) {
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      errors: [
        {
          code: 'INTERNAL_ERROR',
          message: "Can't create user now!",
        },
      ],
    });
  }
});

module.exports = router;
