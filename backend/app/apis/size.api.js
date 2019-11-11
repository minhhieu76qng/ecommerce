const httpCode = require('http-status-codes');
const sizeServices = require('../services/size.service');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  const sizes = await sizeServices.getSizes();

  return res.status(httpCode.OK).json({
    sizes
  })
})

module.exports = router;