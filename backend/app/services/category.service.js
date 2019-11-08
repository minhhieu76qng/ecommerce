// const { Category } = require('@models/category.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Category } = require('../models/category.model');

const findRootCategories = () => {
  return Category.find({ parent: null }).select({
    _id: 1,
    name: 1,
    coverImg: 1
  });
};

const find2ndCategories = () => {
  return Category.where('parent')
    .ne(null)
    .where('ancestors')
    .size(1)
    .exec();
};
const find3rdCategories = () => {
  return Category.where('parent')
    .ne(null)
    .where('ancestors')
    .size(2)
    .exec();
};

const findWithParent = parentID => {
  return Category.find({ parent: parentID });
};

const getCategoryForMenu = async () => {
  const result = await Category.aggregate([
    {
      $match: { parent: null }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: 'parent',
        as: 'childs'
      }
    },
    {
      $project: {
        _id: 1,
        'name': 1,
        'childs._id': 1,
        'childs.name': 1
      }
    }]);
  return result;
};

const getBreadcrumb = async id => {
  const result = await Category.aggregate([
    {
      $match: {
        _id: ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'ancestors',
        foreignField: '_id',
        as: 'parentItems'
      }
    },
    {
      $unwind: {
        path: "$parentItems",
        preserveNullAndEmptyArrays: true
      }
    },
    // Group back to arrays
    {
      $group: {
        "_id": "$_id",
        "name": { $first: "$name" },
        "parentCates": { "$push": "$parentItems" },
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        'parentCates._id': 1,
        'parentCates.name': 1
      }
    }
  ])

  return result;
};

const addNew = (name) => {
  const val = new Category({ name: name });
  return val.save();
};

const addToCate = id => {
  const val = new Category({
    name: 'Skirt',
    parent: id,
    ancestors: [id],
  });
  return val.save();
};

module.exports = {
  findWithParent,
  findRootCategories,
  getCategoryForMenu,
  getBreadcrumb,
  addNew,
  addToCate,
};
