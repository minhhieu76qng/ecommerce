const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model.js');
const mailService = require('./mail.service');

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

  const result = await user.save();

  if (!result) {
    return null;
  }

  let count = 0;
  let sent = false;

  do {
    const verificationMail = await mailService.sendVerifyEmail({ _id: result._id, email: result.email });

    sent = verificationMail.isSent;

    if (verificationMail.code && verificationMail.code === 'EAUTH') {
      isSent = false;
      break;
    }

    count++;
  }
  while (!sent && count < 3);

  return {
    isSent: sent,
    user: result
  }
};

const findUserByEmail = email => {
  return User.findOne({ email });
};


const findById = id => {
  return User.findById(id);
}
const comparePassword = (password, encrypted) => {
  return bcrypt.compare(password, encrypted);
};

const generateToken = user => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    isSeller: user.isSeller
  };

  const JWTSECRET = process.env.JWTSECRET;

  return jwt.sign(payload, JWTSECRET, { expiresIn: '1d' });
};


const verifyEmail = async (token) => {
  const JWTSECRET = process.env.JWTSECRET;
  const user = jwt.verify(token, JWTSECRET);

  if (!(user && user._id)) {
    return {
      _id: user._id,
      isVerified: false
    }
  }

  const result = await User.updateOne({ _id: user._id }, { isVerified: true });

  if (!(result && result.nModified > 0)) {
    return {
      _id: user._id,
      isVerified: false
    }
  }

  return {
    _id: user._id,
    isVerified: true
  }
}

module.exports = {
  findById,
  createUser,
  isValidEmail,
  isEmailExist,
  findUserByEmail,
  comparePassword,
  generateToken,
  verifyEmail,
};
