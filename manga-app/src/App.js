import React, { useState, useEffect } from 'react';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import SinglePage from './pages/SinglePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
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
      Accept: 'application/json',
   },
   useGETForQueries: false,
});

const client = new ApolloClient({
   cache,
   link,
});

const App = () => {
   const [loggedIn, setLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
   const [favList, setFavList] = useState([]);

   useEffect(() => {
      const checkUser = async () => {
         const data = await fetch('/api/user');
         const response = await data.json();

         if (response.user) {
            setLoggedIn(true);
            setUser(response.user.user);

            fetch('/api/populate')
               .then((response) => response.json())
               .then((data) => {
                  const favoriteArr = data.favorites;
                  setFavList(favoriteArr);
               });
         } else {
            setLoggedIn(false);
            setUser(null);
         }
      };
      checkUser();
   }, [loggedIn]);

   return (
      <ApolloProvider client={client}>
         <Jumbotron />
         <Router>
            <Nav
               loggedIn={loggedIn}
               setLoggedIn={setLoggedIn}
               user={user}
               setUser={setUser}
            />
            <Switch>
               <Route exact path="/single-page/:type/:id">
                  <SinglePage
                     loggedIn={loggedIn}
                     favList={favList}
                     setFavList={setFavList}
                  />
               </Route>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route exact path="/anime-page">
                  <ListPage type="ANIME" />
               </Route>
               <Route exact path="/manga-page">
                  <ListPage type="MANGA" />
               </Route>
               <Route exact path="/login">
                  <Login setLoggedIn={setLoggedIn} setUser={setUser} />
               </Route>
               <Route exact path="/register">
                  <Register />
               </Route>
               <Route exact path="/dashboard">
                  <Dashboard
                     loggedIn={loggedIn}
                     favList={favList}
                     setFavList={setFavList}
                  />
               </Route>
            </Switch>
         </Router>
      </ApolloProvider>
   );
};

export default App;
