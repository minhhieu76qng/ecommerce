const router = require('express').Router();
const httpCode = require('http-status-codes');
const userService = require('@services/UserService.js');

router.get('/', (req, res, next) => {
  res.json({
    a: 'a'
  })
})
router.get('/:id', (req, res, next) => {
  res.json({
    a: 'a'
  })
})

router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        code: 'MISSING',
        message: 'Fields are required!'
      }]
    })
  }

  // VALID EMAIL
  if (!userService.isValidEmail(email)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        code: 'INVALID',
        message: 'Email is not valid!'
      }]
    })
  }

  try {
    const isExist = await userService.isEmailExist(email);

    if (isExist) {
      return res.status(httpCode.CONFLICT).json({
        errors: [{
          code: 'EXIST',
          message: 'Email is already exist!',
          email
        }]
      })
    }

    const result = await userService.createUser(name, email, password);

    if (!result) {
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
        errors: [{
          code: 'INTERNAL_ERROR',
          message: 'Can\'t create user now!'
        }]
      })
    }

    return res.status(httpCode.CREATED).json({
      user: {
        id: result._id,
        email: result.email,
        name: result.name,
      },
      success: {
        message: 'Create user successfully!'
      }
    })
  }
  catch (err) {
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      errors: [{
        code: 'INTERNAL_ERROR',
        message: 'Can\'t create user now!'
      }]
    })
  }
})


module.exports = router;