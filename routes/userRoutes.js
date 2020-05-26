const express = require('express');
const passport = require('../config/passport/index');
const User = require('../models/User');

const router = express.Router();

const regValidation = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

router.post('/api/register', (req, res) => {
   const { user, password, password2 } = req.body;
   const errors = [];

   if (!user || !password || !password2) {
      errors.push({ msg: 'Must fill out all fields!' });
   }
   if (password !== password2) {
      errors.push({ msg: 'Passwords must match!' });
   }
   if (password.length < 6 || password.length > 20) {
      errors.push({ msg: 'Password must be between 6-20 characters!' });
   }
   if (!password.match(regValidation)) {
      errors.push({
         msg: 'Password must contain an uppercase, lowercase, and number!',
      });
   }
   if (errors.length > 0) {
      res.send(errors);
      return;
   }

   User.findOne({ user })
      // eslint-disable-next-line consistent-return
      .then((result) => {
         if (result) {
            errors.push({ msg: 'User already exists!' });
            res.send(errors);
            return;
         }

         User.create({ user, password }, (error) => {
            if (error) throw error;
            // eslint-disable-next-line no-unused-vars
         });
         res.json('OK');
      });
});

// eslint-disable-next-line consistent-return
router.post('/api/login', passport.authenticate('local'), (req, res) => {
   const user = JSON.parse(JSON.stringify(req.user));
   const cleanUser = { ...user };

   if (cleanUser) {
      delete cleanUser.password;
   }
   res.json({ user: cleanUser });
});

router.get('/api/user', (req, res) => {
   if (req.user) return res.json({ user: req.user });
   return res.json({ user: null });
});

router.get('/api/logout', (req, res) => {
   req.logout();
   res.json('Successfully logged out');
});

module.exports = router;
