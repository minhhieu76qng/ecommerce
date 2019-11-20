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
    if (cate.ancestors.length >= 2) {
      result = await categoryService.findWithParent(cate.parent);
    } else {
      result = await categoryService.findWithParent(parentID);
    }

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
    const page = req.query.page || 1;

    let { offset, limit } = req.query;

    if (!(offset && limit)) {
      offset = page - 1;
      limit = 4;
    }

    // kiểm tra category đó có phải là leaf hay không
    // nếu là leaf thì lấy trong leaf
    // ngược lại thì lấy trong ancestors

    const isLeaf = await categoryService.isLeaf(id);

    if (isLeaf === null) {
      return res.status(httpCode.BAD_REQUEST).json({ list: null });
    }

    let result = null;
    let totalProducts = 0;

    if (result === null) {
      if (isLeaf === true) {
        result = await Promise.all([
          productService.getProductByCategoryID(id, offset, limit, req.query, req.query.sort),
          productService.countProductWithLeaf(id, req.query)
        ])
      } else {
        result = await Promise.all([
          productService.getProductByAncestor(id, offset, limit, req.query, req.query.sort),
          productService.countProductWithAncestors(id, req.query)
        ])
      }
    }
    totalProducts = result[1][0].total;

    const totalPage = Math.ceil(totalProducts / limit);

    return res.status(httpCode.OK).json({ list: result[0], currentPage: page, totalPage: totalPage, isSuccess: true })
  }
  catch (err) {
    console.log(err);
    return res.json({ list: null, isSuccess: false });
  }
})


// trash

router.post('/', async (req, res, next) => {
  const result = await categoryService.addToCate('5dc4e338c7c42205a85d567c');

  return res.json({ result })
})

module.exports = router;