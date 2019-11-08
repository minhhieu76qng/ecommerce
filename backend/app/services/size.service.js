const { Size } = require('../models/size.model');

const getSizes = () => {
  return Size.find();
}

const getSizeByID = sizeID => {
  return Size.findById(sizeID);
}

module.exports = [
  getSize,
  getSizeByID
]