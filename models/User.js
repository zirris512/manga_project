const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
   user: {
      type: String,
      required: true,
      index: {
         unique: true,
      },
   },
   password: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   favorites: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Favorites',
      },
   ],
});

UserSchema.methods = {
   checkPassword(inputPass) {
      return bcrypt.compareSync(inputPass, this.password);
   },
   hashPassword(plainPass) {
      return bcrypt.hashSync(plainPass, 10);
   },
};

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
   if (!this.password) {
      next();
   } else {
      this.password = this.hashPassword(this.password);
      next();
   }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
