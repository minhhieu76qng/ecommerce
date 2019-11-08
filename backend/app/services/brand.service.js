const { Brand } = require('../models/brand.model');

const getBrands = () => {
  return Brand.find();
}

const getBrandByID = BrandID => {
  return Brand.findById(BrandID);
}

module.exports = [
  getBrands,
  getBrandByID
]