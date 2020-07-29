import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import PageNav from '../PageNav/PageNav';
import { GET_ANIME, GET_MANGA } from '../../data/queries';

const ApiQuery = ({ search, perPage, type, sort, isHome }) => {
   const [page, setPage] = useState(1);

   const { data, loading, error } = useQuery(
      type === 'ANIME' ? GET_ANIME : GET_MANGA,
      {
         variables: {
            search,
            perPage,
            page,
            type,
            sort,
         },
      }
   );

   useEffect(() => {
      setPage(1);
   }, [search]);

   if (loading) return <h1>Loading...</h1>;
   if (error) return <h2>ERROR: {error.message}</h2>;
   if (!data) return <h2>No Data Found</h2>;

   return (
      <>
         <div className="row">
            {data.Page.media.map((value, key) => {
               const imgString = value.coverImage.large;

               return (
                  <div className="col-md-3 col-sm-6 col-xs-6 my-2" key={key}>
                     <Link to={`/single-page/${type}/${value.id}`}>
                        <h3>
                           {value.title.english
                              ? value.title.english
                              : value.title.romaji}
                        </h3>
                        <img
                           src={imgString}
                           alt={imgString.substring(
                              imgString.lastIndexOf('/') + 1
                           )}
                        />
                     </Link>
                  </div>
               );
            })}
         </div>
         {!isHome && (
            <PageNav
               page={page}
               setPage={setPage}
               hasNextPage={data.Page.pageInfo.hasNextPage}
               currentPage={data.Page.pageInfo.currentPage}
               lastPage={data.Page.pageInfo.lastPage}
            />
         )}
      </>
   );
};

export default ApiQuery;
