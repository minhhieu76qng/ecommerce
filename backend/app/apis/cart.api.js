const router = require('express').Router();
const httpCode = require('http-status-codes');
const cartService = require('../services/cart.service.js');
const productService = require('../services/product.service');
const { authUser } = require('../middlewares/auth.mdw');

router.get('/', authUser, async (req, res, next) => {

  const userId = req.user._id;
  try {
    const cart = await cartService.getCart(userId);
    return res.status(httpCode.OK).json({
      cart
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR);
  }
})

router.post('/products', authUser, async (req, res, next) => {

  const userId = req.user._id;

  const product = req.body;

  // require cac field
  if (!(product._id && product.productId && product.quantity >= 1 && product.color && product.size)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        message: 'Fields are required!'
      }]
    })
  }


  // kiem tra xem product co nam trong danh sach san pham khong
  const existProduct = await productService.getProductById(product.productId);

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

    const result = await cartService.addToCart(userId, product);

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

// update 1 item trong cart
router.patch('/products/:id', authUser, async (req, res, next) => {

  const { product } = req.body;

  const { _id: userId } = req.user;

  if (!product) {
    return res.status(httpCode.FORBIDDEN).json({
      errors: [{
        message: 'Payload is not found!'
      }]
    })
  }

  const { id: cartItemId } = req.params;
  if (cartItemId !== product._id) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        message: 'Product ID does not match with api!'
      }]
    })
  }

  try {
    // kiem tra product co ton tai hay khong
    const result = await cartService.updateProductInCart(userId, product);

    if (result.nModified <= 0) {
      return res.status(httpCode.NOT_MODIFIED).json({
        isUpdated: false
      })
    }

    return res.status(httpCode.OK).json({
      isUpdated: true
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR);
  }
})

// delete 1 item trong cart
router.delete('/products/:id', authUser, async (req, res, next) => {
  const { id: cartItemId } = req.params;
  const { _id: userId } = req.user;

  try {
    // kiem tra product co ton tai hay khong
    const result = await cartService.removeProductInCart(userId, cartItemId);

    if (result.nModified <= 0) {
      return res.status(httpCode.NOT_MODIFIED).json({
        isUpdated: false
      })
    }

    return res.status(httpCode.OK).json({
      isUpdated: true
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR);
  }
})

module.exports = router;
