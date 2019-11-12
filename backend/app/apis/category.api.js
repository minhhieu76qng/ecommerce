const router = require('express').Router();
const httpCode = require('http-status-codes');
const categoryService = require('@services/category.service');
const productService = require('@services/product.service');

// get menu

router.get('/', async (req, res, next) => {
  const result = await categoryService.getAll();
  return res.json({ result })
})

router.get('/menu', async (req, res, next) => {
  try {
    const menu = await categoryService.getCategoryForMenu();

    return res.status(httpCode.OK).json({ menu });
  }
  catch (err) {
    return null;
  }
})

// root categories
router.get('/root', async (req, res, next) => {
  let list = await categoryService.findRootCategories();

  return res.json({ list });
})

router.get('/:id/breadcrumb', async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await categoryService.getBreadcrumb(id);

    if (!result || !(Array.isArray(result)) || result.length === 0)
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ list: null });

    const currentCate = result[0];

    let list = [];

    list.push({ _id: currentCate._id, name: currentCate.name });

    currentCate.parentCates.map(el => {
      list.push(el);
    })

    list.reverse();

    return res.status(httpCode.OK).json({ list });
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ list: null });
  }
})

router.get('/:id/categories', async (req, res, next) => {

  try {
    const parentID = req.params.id;

    const cate = await categoryService.findByID(parentID);

    let result = null;

    // nếu cái category này đã có 2 phần tử trong ancestors
    // -> category này là cuối cùng -> trả về cái list với id là parent của nó
    console.log(cate);
    if (cate.ancestors.length >= 2) {
      console.log(cate.parent);
      result = await categoryService.findWithParent(cate.parent);
    } else {
      console.log('b');
      result = await categoryService.findWithParent(parentID);
    }

    console.log(result);

    if (!result || !(Array.isArray(result)) || result.length === 0)
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ list: null });

    const parent = result[0];

    return res.status(httpCode.OK).json({
      parent: { _id: parent._id, name: parent.name, isEnd: parent.isEnd },
      childs: parent.childs
    })
  }
  catch (err) {
    console.log(err);
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
  const result = await categoryService.addToCate('5dc4e338c7c42205a85d567c');

  return res.json({ result })
})

module.exports = router;