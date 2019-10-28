const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
  ancestor: [{
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  }]
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };