const router = require('express').Router();

router.use('/users', require('./user/user.api'));
router.use('/auth', require('./auth/auth.api'));

module.exports = router;