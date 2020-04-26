import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import { BsFillPersonFill, BsSearch } from 'react-icons/bs';

function Nav() {
   const iconStyle = {
      "color": "white",
      "fontSize": "25px"
      }

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container">
            <p className="navbar-brand">Manga Project</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/">Home</Link>
                  <Link className="nav-item nav-link" to="/anime-page">Anime</Link>
                  <Link className="nav-item nav-link" to="/manga-page">Manga</Link>
               </div>
               <form className="form-inline input-group">
                  <input className="form-control" type="search" placeholder="Search" style={{"maxWidth": "50%"}}></input>
                  <button className="btn btn-light ml-2 input-group-append" type="submit" style={{"height": "40px", "width": "50px"}}><BsSearch style={{"fontSize": "25px"}} /></button>
               </form>
               <Link id="login" type="button" className="nav-link btn btn-danger mt-2 pt-1" to="/login"><BsFillPersonFill style={iconStyle} /></Link>
            </div>
         </div>
      </nav>
   )
}

export default Nav;