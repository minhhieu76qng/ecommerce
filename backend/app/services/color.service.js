const { Color } = require('../models/color.model');

const getColors = () => {
  return Color.find();
}

const getColorByID = ColorID => {
  return Color.findById(ColorID);
}

module.exports = [
  getColors,
  getColorByID
]