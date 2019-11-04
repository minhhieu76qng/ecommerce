const router = require('express').Router();

router.use('/users', require('./user/user.api'));
router.use('/auth', require('./auth/auth.api'));
router.use('/category', require('./category/category.api'));


module.exports = router;