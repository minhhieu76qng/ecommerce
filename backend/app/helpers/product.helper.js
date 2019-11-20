
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

const createSortInSellerProduct = sort => {
  let sortObject = {};
  switch (sort) {
    case 'az':
      sortObject = {
        'name': 1
      };
      break;
    case 'za':
      sortObject = {
        'name': -1
      };
      break;
    case 'dateAdded':
      sortObject = {
        'createdAt': -1
      };
      break;
    default:// default sort la sort theo dateAdded
      sortObject = {
        'createdAt': -1
      };
  }

  return sortObject;
}

module.exports = {
  createSort, createFilter, createSortInSellerProduct
};
