import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Nav() {

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/">Home</Link>
                  <Link className="nav-item nav-link" to="/anime-page">Anime</Link>
                  <Link className="nav-item nav-link" to="/manga-page">Manga</Link>
               </div>
               <Link className='ml-auto' to="/login"><button className="nav-link btn btn-danger btn-sm mt-2 my-auto pt-1"><FontAwesomeIcon icon={faSignInAlt} size='2x' /></button></Link>
            </div>
         </div>
      </nav>
   )
}

export default Nav;