import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = ({ loggedIn, favList, setFavList }) => {

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

   if (loggedIn) {
      return (
         <div className='container'>
            <h2>Favorite List</h2>
            <div className='row'>
               {favList.map((value) => (
                  <div className='col-md-4' key={value._id}>
                     <button className='btn btn-outline-primary' value={value._id} onClick={e => removeItem(e.target.value)}>&times;</button>
                     <Link to={`/single-page/${value.type}/${value.listID}`}>
                        <p style={{fontSize: '20px'}}>{value.title}</p>
                        <img className='fav-img' src={value.image} alt=''/>
                     </Link>
                  </div>
               ))}
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