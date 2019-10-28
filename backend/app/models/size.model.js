const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  name: String
});

const Size = mongoose.model('Size', SizeSchema);

module.exports = { Size };