const ObjectId = require('mongoose').Types.ObjectId;
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');

const getProductByCategoryID = (cateID, offset, limit) => {
  return Product.find({ 'categories': { $in: [cateID] } }).limit(limit).skip(offset * limit);
};

const getProductByAncestor = (id, offset, limit) => {
  return Category.aggregate([
    {
      $match: {
        'ancestors': { $in: [ObjectId(id)] },
      }
    },
    {
      $project: {
        _id: 1,
        size: { $size: '$ancestors' }
      }
    },
    {
      $match: {
        size: { $eq: 2 }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'categories',
        as: 'out'
      }
    },
    {
      $unwind: {
        path: "$out",
        // preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: '$out._id',
        name: '$out.name',
        price: '$out.price',
        photos: '$out.photos',
        quantity: '$out.quantity',
        sizes: '$out.sizes',
        colors: '$out.colors',
        brand: '$out.brand',
        description: '$out.description',
        categories: '$out.categories',
      }
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        price: { $first: '$price' },
        photos: { $first: '$photos' },
        quantity: { $first: '$quantity' },
        sizes: { $first: '$sizes' },
        colors: { $first: '$colors' },
        brand: { $first: '$brand' },
        description: { $first: '$description' },
        categories: { $first: '$categories' },
      }
    },
    {
      $skip: limit * offset
    },
    {
      $limit: limit
    }
  ])
}

const countProductWithLeaf = (id) => {
  return Product.where({ 'categories': { $in: [id] } }).countDocuments();
}

const countProductWithAncestors = id => {
  return Category.aggregate([
    {
      $match: {
        'ancestors': { $in: [ObjectId(id)] },
      }
    },
    {
      $project: {
        _id: 1,
        size: { $size: '$ancestors' }
      }
    },
    {
      $match: {
        size: { $eq: 2 }
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'categories',
        as: 'out'
      }
    },
    {
      $unwind: {
        path: "$out",
        // preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: '$out._id',
      }
    },
    {
      $group: {
        _id: '$_id'
      }
    },
    {
      $count: 'total'
    }
  ])
}

const addNewProduct = product => {
  const pd = new Product(product);

  return pd.save();
};

module.exports = {
  countProductWithLeaf,
  countProductWithAncestors,
  getProductByAncestor,
  getProductByCategoryID,
  addNewProduct
};
