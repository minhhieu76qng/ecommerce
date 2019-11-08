const router = require('express').Router();
const productService = require('@services/product.service');

router.post('/', async (req, res, next) => {
  const photos = [], name = 'PRODUCT 1', categories = ['5dc0e07b17d7103254751995', '5dc0e07b17d7103254751995'],
    brand = '5dc11eb91c9d4400008e6be4', price = 102, sizes = ['5dc11fa81c9d4400008e6bf6'],
    colors = ['5dc11f5f1c9d4400008e6bea'], quantity = 10, description = 'jhf hhf kdfkhs hfsk hfsj';

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

module.exports = router;