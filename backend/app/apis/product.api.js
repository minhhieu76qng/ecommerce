const router = require('express').Router();
const httpCode = require('http-status-codes');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Aws = require('aws-sdk');
const productService = require('../services/product.service');

const { authSeller } = require('../middlewares/auth.mdw');


const { USER_KEY, USER_SECRET, BUCKET_NAME } = process.env;

// MULTER
const s3Bucket = new Aws.S3({
  accessKeyId: USER_KEY,
  secretAccessKey: USER_SECRET,
  Bucket: BUCKET_NAME,
  region: "ap-southeast-1"
});
var upload = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: `${BUCKET_NAME}`,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const name = file.originalname;
      const ext = name.substring(name.lastIndexOf("."), name.length);
      cb(null, `product_imgs/${Date.now().toString()}${ext}`);
    }
  })
});

const multerUploader = upload.single("image");

router.get('/:id', async (req, res, next) => {
  const { id: productId } = req.params;
  try {
    const product = await productService.getProductById(productId);

    return res.status(httpCode.OK).json({
      product
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR);
  }
})

router.get('/:id/relatedproducts', async (req, res, next) => {
  const { id: productId } = req.params;
  try {
    const products = await productService.getThumbnailAlsoLike(productId, 8);

    return res.status(httpCode.OK).json({
      _id: productId,
      products
    })
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      _id: productId,
      products: null
    });
  }
})

router.post('/', authSeller, async (req, res, next) => {
  const {
    productPhotos,
    productName,
    productCategories,
    productBrand,
    productPrice,
    productSizes,
    productColors,
    productQuantity,
    productDescription } = req.body;

  if (!(productPhotos && productPhotos.length !== 0 && productName
    && productCategories && productCategories.length !== 0
    && productBrand && productPrice && productSizes && productSizes.length !== 0
    && productColors && productColors.length !== 0 && productQuantity)) {
    return res.status(httpCode.BAD_REQUEST).json({
      errors: [{
        msg: 'Field is required!'
      }]
    })
  }



  try {

    const result = await productService.addNewProduct({
      photos: productPhotos,
      name: productName,
      categories: productCategories,
      brand: productBrand,
      sizes: productSizes,
      price: productPrice,
      colors: productColors,
      total: productQuantity,
      description: productDescription
    });

    return res.status(httpCode.OK).json({ _id: result._id });

  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ err })
  }
})

router.post('/avatar', authSeller, (req, res, next) => {
  multerUploader(req, res, async err => {
    if (err) {
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
        status: httpCode.INTERNAL_SERVER_ERROR,
        errors: [
          {
            message: "Cant upload photo right now!"
          }
        ]
      });
    }

    try {
      // save to db
      const location = req.file.location;

      return res.status(httpCode.OK).json({
        data: {
          location
        }
      })
    } catch (err) {
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
        errors: [
          {
            message: 'Cant upload photo right now!'
          }
        ]
      })
    }
  });
})

router.get('/', async (req, res, next) => {
  const defaultSort = 'dateAdd';

  const page = req.query.page || 1;

  const offset = page - 1, limit = 10;


  try {
    const result = await productService.getAllProductsWithSold(limit, offset, {});

    return res.status(httpCode.OK).json({
      products: result
    })
  }
  catch (err) {
    console.log(err);

    return res.status(httpCode.INTERNAL_SERVER_ERROR);
  }
})


module.exports = router;