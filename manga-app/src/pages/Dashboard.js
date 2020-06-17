import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Dashboard = ({ loggedIn }) => {

   const [data, setData] = useState([]);

   useEffect(() => {
      fetch('/api/populate')
      .then((response) => {
         return response.json()
      })
      .then((data) => {
         const favoriteArr = data.favorites;
         setData(favoriteArr);
      });
   }, []);

   if (loggedIn) {
      return (
         <div className='container'>
            <h2>Favorite List</h2>
            <div className='row'>
               {data.map((value, key) => (
                  <div className='col-md-4' key={key}>
                     <Link to={`/anime-page/${value.listID}`}>
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