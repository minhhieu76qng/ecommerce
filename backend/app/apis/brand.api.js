const httpCode = require('http-status-codes');
const router = require('express').Router();
const brandServices = require('../services/brand.service');
const productServices = require('../services/product.service');

router.get('/', async (req, res, next) => {
  const brands = await brandServices.getBrands();

  return res.status(httpCode.OK).json({
    brands
  })
})

router.get('/:id/products', async (req, res, next) => {
  const { id: brandId } = req.params;

  try {
    const products = await productServices.getProductsInBrand(brandId, 4);

    return res.status(httpCode.OK).json({
      products
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR);
  }
})

module.exports = router;