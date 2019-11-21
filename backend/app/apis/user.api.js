const router = require('express').Router();
const httpCode = require('http-status-codes');
const userService = require('@services/user.service.js');

router.post('/', async (req, res, next) => {
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
            message: "Can't create user now!",
          },
        ],
      });
    }

    return res.status(httpCode.CREATED).json({
      user: {
        id: result.user._id,
        email: result.user.email,
        name: result.user.name,
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

router.get('/verification/:token', async (req, res, next) => {
  const { token } = req.params;

  const result = await userService.verifyEmail(token);

  if (!result.isVerified) {
    return res.status(httpCode.OK).render('redirect', {
      layout: false,
      isVerified: false,
      message: 'Account is not verified! Please contact to admin to fix it.'
    })
  }

  return res.status(httpCode.OK).render('redirect', {
    layout: false,
    isVerified: false,
    message: 'Account is verified!'
  })
})

module.exports = router;
