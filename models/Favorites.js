const mongoose = require('mongoose');

const { Schema } = mongoose;

const FavoriteSchema = new Schema({
   listID: {
      type: Number,
   },
   title: {
      type: String,
   },
   image: {
      type: String,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Favorites = mongoose.model('Favorites', FavoriteSchema);

module.exports = Favorites;
