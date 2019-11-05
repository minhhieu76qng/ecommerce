const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('@models/user.model.js');

const SALT = 10;

const isValidEmail = email => {
  const pattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

  return pattern.test(email);
};

const isEmailExist = async email => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return true;
  }

  return false;
};

const hashPassword = password => {
  return bcrypt.hash(password, SALT);
};

const createUser = async (name, email, password) => {
  const hash = await hashPassword(password);

  const user = new User({ name, email, password: hash });

  return await user.save();
};

const findUserByEmail = email => {
  return User.findOne({ email });
};

const comparePassword = (password, encrypted) => {
  return bcrypt.compare(password, encrypted);
};

const generateToken = user => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  const JWTSECRET = process.env.JWTSECRET || 'secret_string';

  return jwt.sign(payload, JWTSECRET, { expiresIn: '1d' });
};

module.exports = {
  createUser,
  isValidEmail,
  isEmailExist,
  findUserByEmail,
  comparePassword,
  generateToken,
};
