const router = require('express').Router();
const categoryService = require('@services/category.service');

// get all
router.get('/', async (req, res, next) => {
  const menu = await categoryService.getCategoryForMenu();

  return res.json({ menu: menu });
})

router.post('/', async (req, res, next) => {
  const result = await categoryService.addToCate('5dc0051a6ccbcf08d0658d78');

  return res.json({ result })
})

module.exports = router;