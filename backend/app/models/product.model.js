const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  brand: {
    type: mongoose.Types.ObjectId,
    ref: 'Brand'
  },
  price: Number,
  sizes: [{ type: mongoose.Types.ObjectId, ref: 'Size' }],
  colors: [{ type: mongoose.Types.ObjectId, ref: 'Color' }],
  quantity: Number,
  description: String,
  photos: [String]
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };