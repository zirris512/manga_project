import React from 'react';
import Nav from '../components/Nav/index';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
   uri: "https://graphql.anilist.co",
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

client
  .query({
    query: gql`
      query ($search: String, $perPage: Int) {
         Page (perPage: $perPage) {
            media(type: ANIME, search: $search) {
               title {
                  english
               }
               description
               episodes
               coverImage {
                  large
               }
            }
         }
      }
   `
  })
  .then(result => console.log(result));

const AnimePage = () => {
   return (
      <div>
         <Nav />
         <h1>This is the Anime page!</h1>
      </div>
   )
}

export default AnimePage;