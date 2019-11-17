const ObjectId = require('mongoose').Types.ObjectId;
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');

const createFilter = filter => {
  let filterObject = {};
  if (Object.entries(filter).length === 0 && filter.constructor === Object) {
    return filterObject;
  }

  if (filter.size) {
    // nếu có size -> get size
    filterObject.sizes = { $in: [ObjectId(filter.size)] };
  }
  if (filter.color) {
    filterObject.colors = { $in: [ObjectId(filter.color)] }
  }
  if (filter.brands) {
    // nếu có size -> get size
    let temp = [];

    if (!Array.isArray(filter.brands)) {
      temp.push(ObjectId(filter.brands));
    } else {
      temp = filter.brands.map(val => ObjectId(val));
    }

    filterObject.brand = {
      $in: temp
    }
  }
  if ((filter.priceFrom === '0' || filter.priceFrom) && filter.priceTo) {
    const from = Number.parseInt(filter.priceFrom);
    const to = Number.parseInt(filter.priceTo);
    if (Number.isInteger(from) && Number.isInteger(to)) {
      if (from >= 0 && from < to) {
        // nếu có size -> get size
        filterObject.price = {
          $gte: from,
          $lte: to
        }
      }
    }
  }
  if (filter.instock || filter.outstock) {
    if (!(filter.instock == 'true' && filter.outstock == 'true')) {
      if (filter.instock == 'true') {
        filterObject.quantity = {
          $gt: 0
        }
      }
      if (filter.outstock == 'true') {
        filterObject.quantity = {
          $eq: 0
        }
      }
    }
  } else {
    // default
    filterObject.quantity = {
      $gt: 0
    }
  }

  return filterObject;
}

const getProductByCategoryID = (cateID, offset, limit, filter) => {
  const filterObject = createFilter(filter);
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
      $skip: offset * limit
    },
    {
      $limit: limit
    }
  ])
};

const getProductByAncestor = (id, offset, limit, filter) => {
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
