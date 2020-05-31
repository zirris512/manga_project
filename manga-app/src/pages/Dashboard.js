import React, { useState, useEffect } from 'react'

const Dashboard = ({ loggedIn }) => {
   if (loggedIn) {
      return (
         <div className='container'>
            <div className='row'>
               <p>Anime List</p>
            </div>
            <div className='row'>
               <p>Manga List</p>
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