import React from 'react';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import AnimePage from './pages/AnimePage';
import AnimeSinglePage from './pages/AnimeSinglePage'
import MangaPage from './pages/MangaPage';
import MangaSinglePage from './pages/MangaSinglePage'
import Login from './pages/Login';
import Register from './pages/Register';
import Jumbotron from './components/Jumbotron/index';
import Nav from './components/Nav/index';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
   uri: 'https://graphql.anilist.co',
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
   useGETForQueries: false,
});

const client = new ApolloClient({
   cache,
   link
 });

const App = () => {
   return (
      <ApolloProvider client={client}>
         <Jumbotron />
         <Router>
            <Nav />
            <Switch>
               <Route exact path='/anime-page/:id' component={AnimeSinglePage} />
               <Route exact path='/manga-page/:id' component={MangaSinglePage} />
               <Route exact path='/' component={Home}/>
               <Route exact path='/anime-page' component={AnimePage} />
               <Route exact path='/manga-page' component={MangaPage} />
               <Route exact path='/login' component={Login} />
               <Route exact path='/register' component={Register} />
            </Switch>
         </Router>
      </ApolloProvider>
   )
}

export default App;