const { Product } = require('../models/product.model');

const getProductByCategoryID = (cateID, offset, limit) => {
  // return Product.aggregate([
  //   {
  //     $match: {
  //       categories: { $in: [cateID] }
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'categories',
  //       localField: 'categories',
  //       foreignField: '_id',
  //       as: 'category_detail',
  //     }
  //   }
  // ])

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
