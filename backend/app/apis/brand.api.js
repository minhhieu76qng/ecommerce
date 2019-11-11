const httpCode = require('http-status-codes');
const brandServices = require('../services/brand.service');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  const brands = await brandServices.getBrands();

  return res.status(httpCode.OK).json({
    brands
  })
})

module.exports = router;