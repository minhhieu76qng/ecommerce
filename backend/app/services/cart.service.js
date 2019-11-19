const ObjectId = require('mongoose').Types.ObjectId;
const { User } = require('../models/user.model.js');

const addToCart = (userId, product) => {
  let temp = product;
  temp._id = ObjectId(product._id);
  return User.updateOne({ _id: userId }, { $push: { cart: temp } })
}

const getCart = userId => {
  return User.aggregate([
    {
      $match: {
        _id: ObjectId(userId)
      }
    },
    {
      $project: {
        cart: '$cart'
      }
    },
    {
      $unwind: '$cart'
    },
    {
      $project: {
        _id: '$cart._id',
        size: '$cart.size',
        color: '$cart.color',
        quantity: '$cart.quantity',
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'out'
      }
    },
    {
      $unwind: '$out'
    },
    {
      $project: {
        _id: '$_id',
        name: '$out.name',
        photos: '$out.photos',
        price: '$out.price',
        total: '$out.total',
        size: '$size',
        color: '$color',
        quantity: '$quantity',
      }
    }
  ])
}


module.exports = {
  addToCart,
  getCart
};
