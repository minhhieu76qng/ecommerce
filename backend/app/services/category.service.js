// const { Category } = require('@models/category.model');

const { Category } = require('../models/category.model');

const findRootCategories = () => {
  return Category.find({ parent: null });
}

const find2ndCategories = () => {
  return Category
    .where('parent').ne(null)
    .where('ancestors').size(1).exec();
}
const find3rdCategories = () => {
  return Category
    .where('parent').ne(null)
    .where('ancestors').size(2).exec();
}

const findWithParent = (parentID) => {
  return Category.where('parent').equals(parentID);
}

const getCategoryForMenu = async () => {
  let tree = [];
  try {
    const root = await findRootCategories();

    await Promise.all(root.map(async cate => {
      const id = cate._id;
      let item = {
        id,
        name: cate.name
      }

      const subCate = await findWithParent(id);

      item.childs = subCate.map(el => { return { id: el._id, name: el.name } });

      tree.push(item);
    }))

    return tree;
  }
  catch (err) {
    return null;
  }
}

const addNew = () => {
  const val = new Category({ name: 'Girls' });
  return val.save();
}

const addToCate = (id) => {
  const val = new Category({ name: 'T-Shirt', parent: id, ancestors: [{ id: id }] });
  return val.save();
}

module.exports = {
  getCategoryForMenu,
  addNew,
  addToCate
}