const productService = require('../services/product.service');
const cartService = require('../services/cart.service');
const sizeService = require('../services/size.service');
const colorService = require('../services/color.service');
const { Order } = require('../models/order.model');
const { createSortObject } = require('../helpers/order.helper');

const orderStatus = {
  pending: 'PENDING',
  completed: 'COMPLETED',
  canceled: 'CANCELED',
};

function createId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const getAllOrder = () => {};

const addSingleOrder = async (userId, cartItem) => {
  try {
    // lay san pham
    const product = await productService.getProductById(cartItem.productId);
    if (!product.sizes.includes(cartItem.size)) {
      return {
        isAdded: false,
        errors: [
          {
            message: 'Product not contain your order size!',
          },
        ],
      };
    }

    if (!product.colors.includes(cartItem.color)) {
      return {
        isAdded: false,
        errors: [
          {
            message: 'Product not contain your order color!',
          },
        ],
      };
    }

    if (cartItem.quantity > product.quantity) {
      return {
        isAdded: false,
        errors: [
          {
            message: 'The quantity of products is not enough for your order!',
          },
        ],
      };
    }

    const sizes = await sizeService.getSizes();
    const colors = await colorService.getColors();

    let orderObject = null;

    orderObject = {
      orderId: createId(7),
      orderedDate: new Date(),
      name: cartItem.name,
      size: {
        _id: cartItem.size,
        name: sizes.find(val => val._id.toString() === cartItem.size).name,
      },
      color: {
        _id: cartItem.color,
        name: colors.find(val => val._id.toString() === cartItem.color).name,
      },
      quantity: cartItem.quantity,
      price: cartItem.price,
      status: orderStatus.pending,
      productId: product._id,
    };

    const order = new Order(orderObject);

    const orderResult = await order.save();

    console.log(orderResult);

    if (!orderResult) {
      return {
        isAdded: false,
        errors: [
          {
            message: 'Cant add new order!',
          },
        ],
      };
    }

    // tru san pham trong product
    const newQuantity = product.quantity - orderObject.quantity;
    await productService.updateProductQuantity(
      orderObject.productId,
      newQuantity,
    );

    // remove trong cart
    await cartService.removeProductInCart(userId, cartItem._id);

    return {
      isAdded: true,
      cartItemId: cartItem._id,
      orderId: orderResult.orderId,
      productId: orderResult.productId,
    };
  } catch (err) {
    console.log(err);
    return {
      isAdded: false,
    };
  }
};

const addListOrder = async userId => {
  // lay san pham trong gio hang
  const productsInCart = await cartService.getCart(userId);

  if (productsInCart.length === 0) {
    return {
      isAdded: false,
      errors: [
        {
          message: 'Cart is empty!',
        },
      ],
    };
  }

  const result = await Promise.all(
    productsInCart.map(val => addSingleOrder(userId, val)),
  );

  // tìm những sản phẩm đã thêm được.

  const completedTask = [];

  result.map(val => {
    if (val.isAdded) {
      completedTask.push({
        cartItemId: val.cartItemId,
        orderId: val.orderId,
        productId: val.productId,
      });
    }
  });

  const failedTask = [];

  productsInCart.map(val => {
    if (
      completedTask.findIndex(cpTask => cpTask.cartItemId !== val.cartItemId)
    ) {
      failedTask.push({
        cartItemId: val.cartItemId,
        orderId: val.orderId,
        productId: val.productId,
      });
    }
  });

  return {
    completedTask,
    failedTask,
  };
};

const getOrders = async (limit, offset, sort) => {
  const sortObject = createSortObject(sort);

  const result = await Order.aggregate([
    {
      $sort: sortObject,
    },
    {
      $skip: offset * limit,
    },
    {
      $limit: limit,
    },
  ]);

  return result;
};

const countAll = async () => {
  try {
    const result = await Order.aggregate([
      {
        $count: 'total',
      },
    ]);

    return result[0].total;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllOrders = async (limit, offset, sort) => {
  // dem so luong order
  try {
    const result = await Promise.all([
      getOrders(limit, offset, sort),
      countAll(),
    ]);

    return {
      orders: result[0],
      total: result[1],
    };
  } catch (err) {
    return null;
  }
};

module.exports = {
  addListOrder,
  getAllOrders,
};
