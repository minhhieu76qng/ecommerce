const router = require('express').Router();

router.use('/users', require('./user/user.api'));
router.use('/auth', require('./auth/auth.api'));
router.use('/categories', require('./category/category.api'));
router.use('/products', require('./product/product.api'));

module.exports = router;
