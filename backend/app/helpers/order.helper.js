module.exports = {
  createSortObject: sort => {
    let sortObject = {};

    switch (sort) {
      case 'az':
        sortObject = {
          name: 1,
        };
        break;
      case 'za':
        sortObject = {
          name: -1,
        };
        break;
      default:
        sortObject = {
          orderedDate: -1,
        };
        break;
    }
    return sortObject;
  },
};
