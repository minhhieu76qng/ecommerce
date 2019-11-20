const router = require('express').Router();
const httpCode = require('http-status-codes');

const { authSeller } = require('../middlewares/auth.mdw');
const orderService = require('../services/order.service');


router.get('/', authSeller, async (req, res, next) => {

})

router.post('/', authSeller, async (req, res, next) => {
  try {
    const result = await orderService.addListOrder(req.user._id);

    return res.status(httpCode.OK).json(result)
  }
  catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      errors: [{
        message: 'Internal Server Error!'
      }]
    });
  }
})

module.exports = router;
