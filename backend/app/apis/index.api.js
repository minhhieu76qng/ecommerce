const router = require('express').Router();

router.use('/users', require('./user.api'));
router.use('/auth', require('./auth.api'));
router.use('/categories', require('./category.api'));
router.use('/products', require('./product.api'));
router.use('/sizes', require('./size.api'));
router.use('/colors', require('./color.api'));
router.use('/brands', require('./brand.api'));
router.use('/cart', require('./cart.api'));

module.exports = router;
