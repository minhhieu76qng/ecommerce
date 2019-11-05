// const { Category } = require('@models/category.model');

const { Category } = require('../models/category.model');

const findRootCategories = () => {
  return Category.find({ parent: null });
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
  return Category.where('parent').equals(parentID);
};

const getCategoryForMenu = async () => {
  let tree = [];
  try {
    const root = await findRootCategories();


    // can su dung aggregation

    await Promise.all(
      root.map(async cate => {
        const id = cate._id;
        let item = {
          id,
          name: cate.name,
        };

        const subCate = await findWithParent(id);

        item.childs = subCate.map(el => {
          return { id: el._id, name: el.name };
        });

        tree.push(item);
      })
    );



    return tree;
  } catch (err) {
    return null;
  }
};

const getBreadcrumb = async id => {
  try {
    let ret = [];
    const currentCate = await Category.findById(id);

    ret.push({ id: currentCate._id, name: currentCate.name });

    // mang cac ancestors
    if (currentCate.ancestors.length !== 0) {
      await Promise.all(
        currentCate.ancestors.map(async c => {
          const parentCate = await Category.findById(c.id);

          ret.push({ id: parentCate._id, name: parentCate.name });
        }),
      );
    }

    // reverse lai mang nhan duoc
    ret = ret.reverse();

    return ret;
  } catch (err) {
    return null;
  }
};

const addNew = () => {
  const val = new Category({ name: 'Girls' });
  return val.save();
};

const addToCate = id => {
  const val = new Category({
    name: 'Jackets',
    parent: id,
    ancestors: [{ id: id }],
  });
  return val.save();
};

module.exports = {
  findRootCategories,
  getCategoryForMenu,
  getBreadcrumb,
  addNew,
  addToCate,
};
