import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom'

const GET_SINGLE_MANGA = gql`
   query ($id: Int) {
      Media(id: $id) {
         title {
            romaji
            english
         }
         status
         description
         startDate {
            year
            month
         }
         endDate {
            year
            month
         }
         volumes
         chapters
         coverImage {
            extraLarge
         }
      }
   }
`;

const MangaSinglePage = () => {
   const { id } = useParams();

   const { data, loading, error } = useQuery(GET_SINGLE_MANGA, {
      variables: {
         id
      }
   });

   if (loading) return <h1>Loading...</h1>;
   if (error) return <h2>ERROR: {error.message}</h2>;
   if (!data) return <h2>No Data Found</h2>;

   const { Media } = data;
   const imgString = Media.coverImage.extraLarge;
   
   return (
      <div className='container'>
         <h1 className='my-1'>{Media.title.english ? Media.title.english : Media.title.romaji}</h1>
         <div className='row'>
            <div className='col-md-6'>
               <img src={Media.coverImage.extraLarge} alt={imgString.substring(imgString.lastIndexOf('/') + 1)} className='my-2 anime-img' />
            </div>
            <div className='col-md-6'>
               <p><strong>Description: </strong><span dangerouslySetInnerHTML={{__html: Media.description}}></span></p>
               <p><strong>Status: </strong>{Media.status}</p>
               <p><strong>Airing Dates: </strong>{Media.startDate.month}/{Media.startDate.year} - {Media.endDate.month}/{Media.endDate.year}</p>
               <p><strong># of Volumes: </strong>{Media.volumes}</p>
               <p><strong># of Chapters: </strong>{Media.chapters}</p>
            </div>
         </div>
      </div>
   )
}

export default MangaSinglePage;