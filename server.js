const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const schema = require('./models/graphql');

app.use(
   '/graphql',
   graphqlHTTP({
      schema,
      graphiql: true,
   })
);

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('manga-app/build'));
}

if (process.env.NODE_ENV === 'production') {
   app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'manga_app/build/index.html'));
   });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
