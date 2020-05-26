const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

const strategy = new LocalStrategy(
   { usernameField: 'user' },
   (user, password, done) => {
      User.findOne({ user })
         // eslint-disable-next-line consistent-return
         .then((username) => {
            if (!username) {
               return done(null, false, {
                  message: 'Incorrect email/password',
               });
            }
            if (!username.checkPassword(password)) {
               return done(null, false, {
                  message: 'Incorrect email/password',
               });
            }
            return done(null, username);
         })
         .catch((error) => {
            return done(error);
         });
   }
);

module.exports = strategy;
