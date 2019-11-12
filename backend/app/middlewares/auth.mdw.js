const passport = require('passport');
const httpCode = require('http-status-codes');

const authUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: httpCode.UNAUTHORIZED,
        errors: [
          {
            code: "NOT_AUTHENTICATE",
            message: "No token or token has expired."
          }
        ]
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

const authSeller = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: httpCode.UNAUTHORIZED,
        errors: [
          {
            code: "NOT_AUTHENTICATE",
            message: "No token or token has expired."
          }
        ]
      });
    }

    if (!user.isSeller) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: httpCode.UNAUTHORIZED,
        errors: [
          {
            code: "NOT_AUTHENTICATE",
            message: "Your account is not valid!"
          }
        ]
      });
    }

    req.user = user;
    next();
  })(req, res, next);
}

module.exports = {
  authUser, authSeller
}