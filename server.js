const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const corsOptions = require('./config/cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
   session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);

app.use(cors(corsOptions));

app.use('/', require('./routes/userRoutes'));

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('manga-app/build'));
}

if (process.env.NODE_ENV === 'production') {
   app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'manga_app/build/index.html'));
   });
}

const { MONGODB_URI } = require('./config/keys');

mongoose
   .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
   })
   .catch((err) => {
      if (err) throw err;
   });
