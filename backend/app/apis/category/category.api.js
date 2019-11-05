const router = require('express').Router();
const categoryService = require('@services/category.service');

// get menu
router.get('/menu', async (req, res, next) => {
  const menu = await categoryService.getCategoryForMenu();

  return res.json({ menu: menu });
})

router.post('/', async (req, res, next) => {
  const result = await categoryService.addToCate('5dc0052acee8951f185a39ec');

  return res.json({ result })
})

router.get('/:id/breadcrumb', async (req, res, next) => {
  const id = req.params.id;

  const result = await categoryService.getBreadcrumb(id);
  return res.json({ list: result })
})

module.exports = router;