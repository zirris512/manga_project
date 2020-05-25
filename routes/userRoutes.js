const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/api/register', (req, res) => {
   const { email, password, password2 } = req.body;
   const errors = [];
   const regValidation = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
   const mailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

   if (!email || !password || !password2) {
      errors.push({ msg: 'Must fill out all fields!' });
   }
   if (!email.match(mailValidation)) {
      errors.push({ msg: 'Must be a valid email address!' });
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

   User.findOne({ email })
      // eslint-disable-next-line consistent-return
      .then((result) => {
         if (result) {
            errors.push({ msg: 'User already exists!' });
            res.send(errors);
            return;
         }
         bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;

            User.create({ email, password: hash }, (error) => {
               if (error) throw error;
               // eslint-disable-next-line no-unused-vars
            });
            res.json('OK');
         });
      });
});

module.exports = router;
