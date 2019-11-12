const { Product } = require('../models/product.model');

const getProductByCategoryID = (cateID, offset, limit) => {
  return Product.find({ 'categories': { $in: [cateID] } }).limit(limit).skip(offset);
};

const addNewProduct = product => {
  const pd = new Product(product);

  return pd.save();
};

module.exports = {
  getProductByCategoryID,
  addNewProduct
};
