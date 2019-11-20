const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId: String,
  orderedDate: Date,
  name: String,
  size: {
    _id: mongoose.Types.ObjectId,
    name: String
  },
  color: {
    _id: mongoose.Types.ObjectId,
    name: String
  },
  quantity: Number,
  price: Number,
  status: String,
  productId: mongoose.Types.ObjectId,
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = {
  Order
};
