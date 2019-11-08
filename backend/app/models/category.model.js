const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  coverImg: {
    type: String,
    default: null,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  ancestors: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };
