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

module.exports = router;
