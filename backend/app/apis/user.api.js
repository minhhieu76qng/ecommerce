const router = require('express').Router();
const httpCode = require('http-status-codes');
const userService = require('@services/UserService.js');
const productService = require('../services/product.service');
const { authUser } = require('../middlewares/auth.mdw');

router.get('/', (req, res, next) => {
  res.json({
    a: 'a',
  });
});
router.get('/:id', (req, res, next) => {
  res.json({
    a: 'a',
  });
});

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

// router.post('/:id/products', async (req, res, next) => {
//   const products = req.body;

//   const result = await userService.saveToCart(products);
// })

// them 1 product vao cart
router.post('/:id/products', authUser, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (id !== `${userId}`) {
    return res.status(httpCode.FORBIDDEN).json({
      errors: [{
        message: 'Your login information does not match with api!'
      }]
    })
  }


  const product = req.body;

  // require cac field
  if (!(product._id && product.quantity >= 1 && product.color && product.size)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        message: 'Fields are required!'
      }]
    })
  }


  // kiem tra xem product co nam trong danh sach san pham khong
  const existProduct = await productService.getProductById(product._id);

  if (!existProduct) {
    return res.status(httpCode.NOT_FOUND).json({
      errors: [{
        message: 'Product does not exist!'
      }]
    })
  }

  // kiem tra color, size co nam trong existProduct hay khong
  if (!(existProduct.colors.includes(product.color) && existProduct.sizes.includes(product.size))) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        message: 'Your color or size is not found!'
      }]
    })
  }

  // kiem tra quantity co dung hay khong
  if (!(product.quantity <= existProduct.quantity)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        message: 'Your quantity is greater than product quantity!'
      }]
    })
  }

  try {

    const result = await userService.addToCart(userId, product);

    return res.status(httpCode.CREATED).json({
      added: true
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      errors: [{
        message: 'There was an error adding the product to the cart!'
      }]
    });
  }
})

// router.patch -> cap nhat mot item trong cart

// router.delete -> xoa mot item trong cart

module.exports = router;
