const router = require('express').Router();
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
  return res.json({ list: result })
})

router.get('/:id/categories')

// get product in this category
router.get('/:id/products', async (req, res, next) => {
  try {
    const id = req.params.id;

    let { offset, limit } = req.query;

    if (!(offset && limit)) {
      offset = 0;
      limit = 20;
    }
    const result = await productService.getProductByCategoryID(id, offset, limit);

    return res.json({ result })
  }
  catch (err) {
    console.log(err);
    return res.json({ err })
  }
})


// trash

router.post('/', async (req, res, next) => {
  const result = await categoryService.addToCate('5dc0052acee8951f185a39ec');

  return res.json({ result })
})

module.exports = router;