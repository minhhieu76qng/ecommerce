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

const createSort = sort => {
  let sortObject = { difference: -1 };  // default sort la sort theo popularity
  switch (sort) {
    case 'nameAZ':
      sortObject = {
        'name': 1
      };
      break;
    case 'lowest':
      sortObject = {
        'price': 1
      };
      break;
    case 'highest':
      sortObject = {
        'price': -1
      };
      break;
    default:
      sortObject = { difference: -1 };
  }

  return sortObject;
}

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
