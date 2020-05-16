import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ANIME = gql`
query ($search: String, $perPage: Int, $page: Int) {
   Page (page: $page, perPage: $perPage) {
      pageInfo {
         currentPage
         lastPage
         hasNextPage
      }
      media(type: ANIME, search: $search) {
         title {
            english
            romaji
         }
         coverImage {
            large
         }
      }
   }
}
`

const AnimeQuery = ({ search, perPage, page }) => {
   const { data, loading, error } = useQuery(GET_ANIME, {
      variables: {
         search,
         perPage,
         page
   }});

   if (loading) return <h1>Loading</h1>;
   if (error) return <h2>ERROR: {error.message}</h2>;
   if (!data) return <h2>No Data Found</h2>;

   return (
      <div className='row'>
         {data.Page.media.map((value, key) => (
            <div className="col-md-3 col-sm-6 col-xs-6" key={key}>
               <h3>{value.title.english ? value.title.english : value.title.romaji}</h3>
               <img src={value.coverImage.large} />
            </div>
         ))}
      </div>
   )
}

export default AnimeQuery;