const router = require('express').Router();

router.get('/users', require('./user/user.api'));

module.exports = router;