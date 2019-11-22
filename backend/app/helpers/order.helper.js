module.exports = {
  createSortObject: sort => {
    let sortObject = {};

    switch (sort) {
      default:
        sortObject = {
          orderedDate: -1,
        };
        break;
    }
    return sortObject;
  },
};
