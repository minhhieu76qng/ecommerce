const router = require('express').Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const productService = require('@services/product.service');

const { authSeller } = require('../middlewares/auth.mdw');


// const S3 = new aws.S3({

// })

router.post('/', async (req, res, next) => {
  const photos = [], name = 'PRODUCT 1', categories = ['5dc5142dc29a4919f4b627db', '5dc514116871a43760772f72'],
    brand = '5dc11eb91c9d4400008e6be4', price = 102, sizes = ['5dc11fa81c9d4400008e6bf6', '5dc11f9d1c9d4400008e6bf4', '5dc11fa81c9d4400008e6bf6'],
    colors = ['5dc11f5f1c9d4400008e6bea', '5dc11f681c9d4400008e6bec'], quantity = 10, description = 'jhf hhf kdfkhs hfsk hfsj';

  try {
    const result = await productService.addNewProduct({ photos, name, categories, brand, sizes, price, colors, quantity, description });

    console.log(result);

    return res.json(result);
  }
  catch (err) {
    console.log(err);
    return res.json({ err })
  }
})

router.get('/', authSeller, (req, res, next) => {
  res.json({
    a: 'a..'
  })
})

router.post('/avatar', (req, res, next) => {

})

module.exports = router;