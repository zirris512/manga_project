const express = require('express');
const db = require('../models');
const isAuthenticated = require('../config/passport/isAuthenticated');

const router = express.Router();

router.post('/addFavorite', isAuthenticated, (req, res, next) => {
   const { listID, title, image } = req.body;
   // eslint-disable-next-line no-underscore-dangle
   const id = '5edfe1de204bfc4134a01f59';
   const newFav = {
      listID,
      title,
      image,
   };

   db.Favorites.create(newFav).then((response) => {
      return db.User.findOneAndUpdate(
         { _id: id },
         // eslint-disable-next-line no-underscore-dangle
         { $push: { favorites: response._id } }
      ).catch((err) => {
         if (err) next(err);
      });
   });
   res.json('OK');
});

router.get('/populate', isAuthenticated, (req, res, next) => {
   // eslint-disable-next-line no-underscore-dangle
   const id = '5edfe1de204bfc4134a01f59';

   db.User.findById(id)
      .populate('favorites')
      .then((response) => {
         res.json(response);
      })
      .catch((err) => {
         if (err) next(err);
      });
});

router.delete('/removeFavorite/:id', isAuthenticated, (req, res, next) => {
   // eslint-disable-next-line no-underscore-dangle
   const id = '5edfe1de204bfc4134a01f59';
   // eslint-disable-next-line no-underscore-dangle
   db.User.findByIdAndUpdate(id, { $pull: { favorites: req.params.id } })
      .then((response) => {
         if (response) {
            db.Favorites.findById(req.params.id).then((data) => {
               console.log(data);
               data.remove();
            });
         }
         res.json('Successfully deleted');
      })
      .catch((err) => {
         if (err) next(err);
      });
   // eslint-disable-next-line no-underscore-dangle
});

module.exports = router;
