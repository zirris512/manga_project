const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('manga-app/build'));
}

if (process.env.NODE_ENV === 'production') {
   app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'manga_app/build/index.html'));
   });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
