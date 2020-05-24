const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/api/register', (req, res) => {
   const { email, password, password2 } = req.body;
   let errorCount = 0;
   const regValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
   const mailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

   if (!email || !password || !password2) {
      errorCount += 1;
   }
   if (!email.match(mailValidation)) {
      errorCount += 1;
   }
   if (password !== password2) {
      errorCount += 1;
   }
   if (!password.match(regValidation)) {
      errorCount += 1;
   }

   if (errorCount === 0) {
      User.findOne({ email })
         // eslint-disable-next-line consistent-return
         .then((result) => {
            if (result) {
               return res.sendStatus(409);
            }
            bcrypt.hash(password, 10, (err, hash) => {
               if (err) throw err;

               User.create({ email, password: hash }, (error) => {
                  if (error) throw error;
               });
            });
         });
   }
});

module.exports = router;
