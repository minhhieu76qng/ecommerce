const httpCode = require('http-status-codes');
const colorServices = require('../services/color.service');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  const colors = await colorServices.getColors();

  return res.status(httpCode.OK).json({
    colors
  })
})

module.exports = router;