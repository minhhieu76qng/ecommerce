const ObjectId = require('mongoose').Types.ObjectId;
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const { createFilter, createSort, createSortInSellerProduct } = require('../helpers/product.helper');
const _ = require('lodash');

const getProductByCategoryID = (cateID, offset, limit, filter, sort) => {
  const filterObject = createFilter(filter);
  const sortObject = createSort(sort);
  return Product.aggregate([
    {
      $match: {
        'categories': { $in: [ObjectId(cateID)] }
      }
    },
    {
      $match: filterObject
    },
    {
      $project: {
        _id: '$_id',
        name: '$name',
        price: '$price',
        photos: '$photos',
        quantity: '$quantity',
        sizes: '$sizes',
        colors: '$colors',
        brand: '$brand',
        description: '$description',
        categories: '$categories',
        difference: { $subtract: ["$total", "$quantity"] }
      }
    },
    {
      $sort: sortObject
    },
    {
      $skip: offset * limit
    },
    {
      $limit: limit
    }
  ])
};

const getProductByAncestor = (id, offset, limit, filter, sort) => {
  const filterObject = createFilter(filter);
  const sortObject = createSort(sort);
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
        difference: { $subtract: ["$out.total", "$out.quantity"] }
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
      $match: filterObject
    },
    {
      $sort: sortObject
    },
    {
      $skip: limit * offset
    },
    {
      $limit: limit
    }
  ])
}

const countProductWithLeaf = (id, filter) => {
  const filterObject = createFilter(filter);
  // return Product.where({ 'categories': { $in: [id] } }).countDocuments();
  return Product.aggregate([
    {
      $match: {
        'categories': { $in: [ObjectId(id)] }
      }
    },
    {
      $match: filterObject
    },
    {
      $count: 'total'
    }
  ])
}

const countProductWithAncestors = (id, filter) => {
  const filterObject = createFilter(filter);
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
      $match: filterObject
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

const getProductById = id => {
  return Product.findById(id);
}
const getProductsInBrand = (brandId, limit) => {
  if (limit > 0) {
    return Product.find({ brand: brandId }).limit(limit);
  }
  return Product.find({ brand: brandId });
}

const addNewProduct = product => {
  const pd = new Product(product);

  return pd.save();
};

const getThumbnailAlsoLike = (productId, limit) => {
  return Product.aggregate([
    {
      $match: {
        '_id': ObjectId(productId)
      }
    },
    {
      $project: {
        pCategories: '$categories'
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'pCategories',
        foreignField: 'categories',
        as: 'out'
      }
    },
    {
      $unwind: {
        path: '$out'
      }
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: '$out._id',
        name: '$out.name',
        photos: '$out.photos',
      }
    }
  ])
}

// const getAllProduct = (sort, limit, offset) => {
//   const sortObject = createSortInSellerProduct(sort);

//   return Product.aggregate([
//     {
//       $sort: sortObject
//     },
//     {
//       $skip: offset * limit
//     },
//     {
//       $limit: limit
//     }
//   ])
// }

const updateProductQuantity = async (productId, newQuantity) => {
  if (newQuantity < 0) {
    return {
      isUpdated: false
    }
  }
  const updatedItem = await Product.updateOne({ _id: productId }, { quantity: newQuantity });

  if (updatedItem.nModified <= 0) {
    return {
      isUpdated: false
    }
  }

  return {
    isUpdated: true
  }
}

const incProductQuantity = async (productId, amount) => {
  try {
    const result = await Product.updateOne({ _id: productId }, { $inc: { quantity: amount } });

    if (result.nModified === 0) {
      return {
        isUpdated: false
      }
    }

    return {
      isUpdated: true
    }
  }
  catch (err) {
    console.log(err);
    return {
      isUpdated: false
    }
  }
}

const getAllProductsWithSold = async (limit, offset, sort) => {
  const result = await Product.aggregate([
    {
      $skip: offset * limit
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'productId',
        as: 'out'
      }
    },
    {
      $unwind: '$out'
    },
    {
      $match: {
        'out.status': 'COMPLETED'
      }
    },
    {
      $project: {
        _id: 1,
        photo: { $arrayElemAt: ['$photos', 0] },
        name: 1,
        total: 1,
        createdAt: 1,
        'out.quantity': 1,
        'out.price': 1,
      }
    },
    {
      $group: {
        _id: '$_id',
        photo: { $first: '$photo' },
        name: { $first: '$name' },
        total: { $first: '$total' },
        sold: {
          $sum: '$out.quantity'
        },
        totalProfit: {
          $sum: {
            $multiply: ['$out.quantity', '$out.price']
          }
        }
      }
    }

  ])

  return result;
}

module.exports = {
  countProductWithLeaf,
  countProductWithAncestors,
  getProductByAncestor,
  getProductByCategoryID,
  getProductById,
  addNewProduct,
  getProductsInBrand,
  getThumbnailAlsoLike,
  // getAllProduct,
  updateProductQuantity,
  incProductQuantity,
  getAllProductsWithSold
};
