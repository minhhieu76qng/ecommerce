// const { Category } = require('@models/category.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Category } = require('../models/category.model');

const getAll = () => {
  return Category.aggregate([
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
      $unwind: {
        path: '$childs',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'childs._id',
        foreignField: 'parent',
        as: 'childs.childs'
      }
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        parent: { $first: '$parent' },
        coverImg: { $first: '$coverImg' },
        childs: { $push: '$childs' },
      }
    },
    {
      $addFields: {
        'childs.childs.isLeaf': true
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        coverImg: 1,
        parent: 1,
        'childs._id': 1,
        'childs.name': 1,
        'childs.parent': 1,
        'childs.childs._id': 1,
        'childs.childs.name': 1,
        'childs.childs.parent': 1,
        'childs.childs.isLeaf': 1,
      }
    }
  ])
}

const findRootCategories = () => {
  return Category.find({ parent: null }).select({
    _id: 1,
    name: 1,
    coverImg: 1
  });
};

const findByID = id => {
  return Category.findById(id);
}

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
  return Category.aggregate([
    {
      $match: {
        _id: ObjectId(parentID)
      }
    },
    {
      $lookup: {
        from: 'categories',
        pipeline: [
          {
            $match: {
              parent: ObjectId(parentID)
            }
          }
        ],
        as: 'childs'
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        'childs._id': 1,
        'childs.name': 1
      }
    }
  ])
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

const isLeaf = async id => {
  const result = await Category.findById(id);

  if (result.ancestors.length !== 2) {
    return false;
  }
  return true;
}

const addNew = (name) => {
  const val = new Category({ name: name });
  return val.save();
};

const addToCate = id => {
  const val = new Category({
    name: 'Modern Fit Suit',
    parent: id,
    ancestors: [id, '5dc4e237c3d42430741ec2fe'],
  });
  return val.save();
};

module.exports = {
  isLeaf,
  getAll,
  findByID,
  findWithParent,
  findRootCategories,
  getCategoryForMenu,
  getBreadcrumb,
  addNew,
  addToCate,
};
