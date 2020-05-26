const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config/keys');

mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const dbConnect = mongoose.connection;

dbConnect.on('error', (err) => {
   console.log(`There was an error connecting to the database: ${err}`);
});
dbConnect.once('open', () => {
   console.log(`Successfully connected to the database: ${MONGODB_URI}`);
});

module.exports = dbConnect;
