const router = require('express').Router();
const httpCode = require('http-status-codes');
const categoryService = require('@services/category.service');
const productService = require('@services/product.service');

// get menu
router.get('/menu', async (req, res, next) => {
  const menu = await categoryService.getCategoryForMenu();

  return res.json({ menu: menu });
})

// root categories
router.get('/root', async (req, res, next) => {
  let list = await categoryService.findRootCategories();

  list = list.map(item => ({ id: item.id, name: item.name, coverImg: item.coverImg }))

  return res.json({ list });
})

router.get('/:id/breadcrumb', async (req, res, next) => {
  const id = req.params.id;

  const result = await categoryService.getBreadcrumb(id);

  let ret = null;
  if (result !== null) {
    ret = result.map(item => ({ id: item._id, name: item.name }))
  }

  return res.status(httpCode.OK).json({ list: ret })
})

router.get('/:id/categories', async (req, res, next) => {
  try {
    const parentID = req.params.id;
    const list = await categoryService.findWithParent(parentID);

    return res.status(httpCode.OK).json({ list })
  }
  catch (err) {
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      list: null,
    })
  }
})

// get product in this category
router.get('/:id/products', async (req, res, next) => {
  try {
    const id = req.params.id;

    let { offset, limit } = req.query;

    if (!(offset && limit)) {
      offset = 0;
      limit = 20;
    }
    const list = await productService.getProductByCategoryID(id, offset, limit);

    return res.status(httpCode.OK).json({ list, isSuccess: true })
  }
  catch (err) {
    return res.json({ list: null, isSuccess: false });
  }
})


// trash

router.post('/', async (req, res, next) => {
  const result = await categoryService.addToCate('5dc0052acee8951f185a39ec');

  return res.json({ result })
})

module.exports = router;