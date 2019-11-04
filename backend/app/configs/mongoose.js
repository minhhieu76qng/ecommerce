const mongoose = require('mongoose');

const DB = process.env.DB || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true

}).then(() => console.log('Mongoose connected!')).catch(err => console.log(err));