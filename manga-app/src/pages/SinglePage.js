import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_ANIME, GET_SINGLE_MANGA } from '../data/queries';

const SinglePage = ({ loggedIn, favList, setFavList }) => {
   const { id, type } = useParams();
   let title = '';

   const { data, loading, error } = useQuery(type === 'ANIME' ? GET_SINGLE_ANIME : GET_SINGLE_MANGA, {
      variables: {
         id
      }
   });

   const [added, setAdded] = useState(false);

   useEffect(() => {
      if (favList.length > 0) {
         favList.map(value => {
            if (value.listID === parseInt(id)) {
               setAdded(true);
            }
         })
      }
   }, [favList]);

   const addFavorite = (id, title, image, type) => {
      fetch('/api/addFavorite', {
         method: 'post',
         body: JSON.stringify({ listID: id, title, image, type }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then(response => response.json())
      .then(data => {
         setFavList(prevState => [...prevState, data])
      });
      setAdded(true);
   }

   const buttonToggle = () => {
      if (loggedIn && !added) {
         return <button className='btn btn-outline-info' onClick={() => addFavorite(id, title, imgString, type)}>&#43; Add Favorite</button>
      }
      if (loggedIn && added) {
         return <button className='btn btn-outline-info' disabled={true} onClick={() => addFavorite(id, title, imgString, type)}>&#10003; Add Favorite</button>
      }
   }

   if (loading) return <h1>Loading...</h1>;
   if (error) return <h2>ERROR: {error.message}</h2>;
   if (!data) return <h2>No Data Found</h2>;

   const { Media } = data;
   const imgString = Media.coverImage.extraLarge;

   if (Media.title.english) title = Media.title.english;
   else title = Media.title.romaji;

   if(type === 'ANIME') {
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
                  {buttonToggle()}
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
               {buttonToggle()}
            </div>
         </div>
      </div>
   )
}

export default SinglePage;