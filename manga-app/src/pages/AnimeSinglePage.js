import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom'

const GET_SINGLE_ANIME = gql`
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
         episodes
         duration
         coverImage {
            extraLarge
         }
         streamingEpisodes {
            title
            thumbnail
            url
            site
         }
      }
   }
`;

const AnimeSinglePage = ({ loggedIn }) => {
   const { id } = useParams();
   let title = '';

   const { data, loading, error } = useQuery(GET_SINGLE_ANIME, {
      variables: {
         id
      }
   });

   const addFavorite = (id, title, image) => {
      fetch('/api/addFavorite', {
         method: 'post',
         body: JSON.stringify({ listID: id, title, image}),
         headers: {
            'Content-Type': 'application/json'
         }
      })
   }

   if (loading) return <h1>Loading...</h1>;
   if (error) return <h2>ERROR: {error.message}</h2>;
   if (!data) return <h2>No Data Found</h2>;

   const { Media } = data;
   const imgString = Media.coverImage.extraLarge;

   if (Media.title.english) title = Media.title.english;
   else title = Media.title.romaji;
   
   return (
      <div className='container'>
         <h1 className='my-1'>{title}</h1>
         <div className='row'>
            <div className='col-md-6'>
               <img src={imgString} alt={imgString.substring(imgString.lastIndexOf('/') + 1)} className='my-2 anime-img' />
            </div>
            <div className='col-md-6'>
               <p><strong>Description: </strong><span dangerouslySetInnerHTML={{__html: Media.description}}></span></p>
               <p><strong>Status: </strong>{Media.status}</p>
               <p><strong>Airing Dates: </strong>{Media.startDate.month}/{Media.startDate.year} - {Media.endDate.month}/{Media.endDate.year}</p>
               <p><strong># of Episodes: </strong>{Media.episodes}</p>
               <p><strong>Episode Duration: </strong>{Media.duration} mins</p>
               {loggedIn && <button className='btn btn-outline-info' onClick={() => addFavorite(id, title, imgString)}>&#43; Add Favorite</button>}
            </div>
         </div>
         <h2>Stream Episodes:</h2>
         <div className='row'>
            {
               Media.streamingEpisodes.length !== 0 ? Media.streamingEpisodes.map((value, key) => (
                  <div className='col-md-3' key={key}>
                     <p>{value.title}</p>
                     <a href={value.url} className='mx-1'><img src={value.thumbnail} alt="" style={{width: '100%', height: '200px', maxHeight: '200px'}} /></a>
                     <p>Source: {value.site}</p>
                  </div>
               )) : 
               <h3>No streaming sites available</h3>
            }
         </div>
      </div>
   )
}

export default AnimeSinglePage;