import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = ({ loggedIn, favList, setFavList }) => {

   const styles = {
      row: {
         overflowX: 'auto',
         whiteSpace: 'nowrap',
         flexWrap: 'nowrap',
      },
      col: {
         display: 'inline-block',
         float: 'none',
      },
      text: {
         display: 'unset',
         whiteSpace: 'normal',
         fontSize: '1.2rem',
      }
   };

   const animeList = favList.filter(value => value.type === 'ANIME');
   const mangaList = favList.filter(value => value.type === 'MANGA');

   const removeItem = async item => {
      try {
         const response = await fetch(`/api/removeFavorite/${item}`, {
            method: 'delete',
         });
   
         const result = await response.json();
   
         if (result === 'OK') {
            const newList = favList.filter(value => {
               return value._id !== item;
            });
      
            setFavList(newList);   
         }   
      }
      catch(err) {
         console.error(err);
      }
   }

   const favoritesList = list => {
      if (list.length > 0) {
         return list.map((value) => (
            <div className='col-md-3' style={styles.col} key={value._id}>
               <button className='btn btn-outline-primary' value={value._id} onClick={e => removeItem(e.target.value)}>&times;</button>
               <Link to={`/single-page/${value.type}/${value.listID}`}>
                  <p style={styles.text, {fontSize: '20px'}}>{value.title}</p>
                  <img className='fav-img' src={value.image} alt=''/>
               </Link>
            </div>
         ));
      };

      return <h3 className='col-md'>No Content</h3>;
   };

   if (loggedIn) {
      return (
         <div className='container'>
            <h2>Anime List</h2>
            <div className='row' style={styles.row}>
               {favoritesList(animeList)}
            </div>
            <br />
            <h2>Manga List</h2>
            <div className='row' style={styles.row}>
               {favoritesList(mangaList)}
            </div>
         </div>
      )
   }
   return (
      <div className='container'>
         <div className='row text-center'>
            <h1>You are not authorized to view this resource!</h1>
         </div>
      </div>
   )
}

export default Dashboard;