import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import PageNav from '../PageNav/PageNav';

const GET_ANIME = gql`
query ($search: String, $perPage: Int, $page: Int) {
   Page (page: $page, perPage: $perPage) {
      pageInfo {
         currentPage
         lastPage
         hasNextPage
      }
      media(type: ANIME, search: $search, isAdult: false) {
         id
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

const AnimeQuery = ({ search, perPage }) => {
   const [page, setPage] = useState(1);

   const { data, loading, error } = useQuery(GET_ANIME, {
      variables: {
         search,
         perPage,
         page
   }});

   useEffect(() => {
      setPage(1);
   }, [search]);

   if (loading) return <h1>Loading...</h1>;
   if (error) return <h2>ERROR: {error.message}</h2>;
   if (!data) return <h2>No Data Found</h2>;

   return (
      <>
         <div className='row'>
            {data.Page.media.map((value, key) => {
               const imgString = value.coverImage.large;

               return (
                  <div className='col-md-3 col-sm-6 col-xs-6 my-2' key={key}>
                     <Link to={`/anime-page/${value.id}`}>
                        <h3>{value.title.english ? value.title.english : value.title.romaji}</h3>
                        <img src={imgString} alt={imgString.substring(imgString.lastIndexOf('/') + 1)}/>
                     </Link>
                  </div>

               )
            })}
         </div>
         <PageNav page={page}
         setPage={setPage}
         hasNextPage={data.Page.pageInfo.hasNextPage}
         currentPage={data.Page.pageInfo.currentPage}
         lastPage={data.Page.pageInfo.lastPage} />
      </>
   )
}

export default AnimeQuery;