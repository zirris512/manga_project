const mongoose = require('mongoose');

const { DB_URI } = require('../config/keys');

mongoose.Promise = global.Promise;

mongoose.connect(DB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const dbConnect = mongoose.connection;

dbConnect.on('error', (err) => {
   console.log(`There was an error connecting to the database: ${err}`);
});
dbConnect.once('open', () => {
   console.log(`Successfully connected to the database: ${DB_URI}`);
});

module.exports = dbConnect;
