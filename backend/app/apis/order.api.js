const router = require('express').Router();
const httpCode = require('http-status-codes');
const _ = require('lodash');

const { authSeller } = require('../middlewares/auth.mdw');
const orderService = require('../services/order.service');

router.get('/', authSeller, async (req, res, next) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let sort = req.query.sort || 'date';

  if (!_.isInteger(Number(page))) {
    page = 1;
  }

  if (!_.isInteger(Number(limit))) {
    limit = 10;
  }

  page = _.toInteger(page);
  limit = _.toInteger(limit);

  const offset = page - 1;

  try {
    const result = await orderService.getAllOrders(limit, offset, sort);
    if (!result) {
      return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
        orders: null,
        totalOrders: 0,
        totalPage: 0,
        current: 1,
      });
    }
    return res.status(httpCode.OK).json({
      orders: result.orders,
      totalOrders: result.total,
      totalPage: Math.ceil(result.total / limit),
      current: page,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/', authSeller, async (req, res, next) => {
  try {
    const result = await orderService.addListOrder(req.user._id);

    return res.status(httpCode.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      errors: [
        {
          message: 'Internal Server Error!',
        },
      ],
    });
  }
});

module.exports = router;
