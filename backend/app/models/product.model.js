const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  photos: [String],
  name: String,
  categories: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
  brand: {
    type: mongoose.Types.ObjectId,
    ref: 'Brand',
  },
  price: Number,
  sizes: [{ type: mongoose.Types.ObjectId, ref: 'Size' }],
  colors: [{ type: mongoose.Types.ObjectId, ref: 'Color' }],
  quantity: Number,
  total: Number,
  description: String
}, { timestamps: true });

ProductSchema.pre('save', function (next) {
  this.quantity = this.total;
  next();
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
