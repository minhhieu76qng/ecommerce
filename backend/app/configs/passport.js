const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const userService = require('@services/UserService');


const LS = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function (email, password, done) {
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return done(null, false, { message: 'Incorrect email!' });
    }

    // compare password
    const isSame = userService.comparePassword(password, user.password);

    if (!isSame) {
      return done(null, false, { message: 'Incorrect password!' })
    }

    return done(null, user, { message: 'Logged in!' });
  }
  catch (err) {
    return done(err);
  }
})

passport.use(LS);