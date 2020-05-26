const passport = require('passport');
const User = require('../../models/User');
const LocalStrategy = require('./passport');

passport.serializeUser((user, done) => {
   // eslint-disable-next-line no-underscore-dangle
   done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
   // eslint-disable-next-line no-underscore-dangle
   User.findById({ _id: id._id }, (err, user) => {
      done(err, user);
   });
});

passport.use(LocalStrategy);

module.exports = passport;
