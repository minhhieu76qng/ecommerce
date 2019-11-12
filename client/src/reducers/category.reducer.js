import { SET_CATEGORIES } from '../actions/categoryAction';

const initialState = {
  categories: [],
  planeCategories: [],
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const planeCates = flattenArray(action.categories);
      return {
        ...state,
        categories: [...action.categories],
        planeCategories: [...planeCates],
      };
    default:
      return state;
  }
}

function flattenArray(list) {
  let result = [];

  list.map(lv1 => {
    result.push({ _id: lv1._id, name: lv1.name, parent: lv1.parent });

    lv1.childs.map(lv2 => {
      result.push({ _id: lv2._id, name: lv2.name, parent: lv2.parent });

      lv2.childs.map(lv3 => {
        result.push({
          _id: lv3._id,
          name: lv3.name,
          parent: lv3.parent,
          isLeaf: lv3.isLeaf || false,
        });
      });
    });
  });
  return result;
}
