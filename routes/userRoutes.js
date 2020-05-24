const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/api/register', (req, res) => {
   const { user, email, password } = req.body;

   bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;

      User.create({ user, email, password: hash }, (error) => {
         if (error) throw error;
      });
   });

   res.sendStatus(200);
});

module.exports = router;
