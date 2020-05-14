import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home';
import AnimePage from './pages/AnimePage';
import MangaPage from './pages/MangaPage';
import Login from './pages/Login';
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

// client
//   .query({
//     query: gql`
//       query ($search: String, $perPage: Int) {
//          Page (perPage: $perPage) {
//             media(type: ANIME, search: $search) {
//                title {
//                   english
//                }
//                description
//                episodes
//                coverImage {
//                   large
//                }
//             }
//          }
//       }
//    `,
//    variables: {search: 'Code Geass', perPage: '10'}
//   })
//   .then(result => console.log(result));


const App = () => {
   return (
      <ApolloProvider client={client}>
         <Jumbotron />
         <Router>
            <Nav />
            <Route exact path='/' component={Home}/>
            <Route path='/anime-page' component={AnimePage} />
            <Route path='/manga-page' component={MangaPage} />
            <Route path='/login' component={Login} />
         </Router>
      </ApolloProvider>
   )
}

export default App;