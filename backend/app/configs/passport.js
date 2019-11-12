const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userService = require('@services/UserService');

const { JWTSECRET } = process.env;

const LS = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email, password, done) {
    try {
      const user = await userService.findUserByEmail(email);

      if (!user) {
        return done(null, false, { message: 'Incorrect email!' });
      }

      // compare password
      const isSame = await userService.comparePassword(password, user.password);

      if (!isSame) {
        return done(null, false, { message: 'Incorrect password!' });
      }

      return done(null, user, { message: 'Logged in!' });
    } catch (err) {
      return done(err);
    }
  }
);

const JWT = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await userService.findById(jwtPayload.id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(LS);
passport.use(JWT);