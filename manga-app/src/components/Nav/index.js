import React from 'react';
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
            <a className="navbar-brand" href="/">Manga Project</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <div className="navbar-nav">
                  <a className="nav-item nav-link" href="#">Home</a>
                  <a className="nav-item nav-link" href="#">Anime</a>
                  <a className="nav-item nav-link" href="#">Manga</a>
               </div>
               <form className="form-inline input-group">
                  <input className="form-control" type="search" placeholder="Search" style={{"maxWidth": "50%"}}></input>
                  <button className="btn btn-light ml-2 input-group-append" type="submit" style={{"height": "40px", "width": "50px"}}><BsSearch style={{"fontSize": "25px"}} /></button>
               </form>
               <a id="login" type="button" className="nav-link btn btn-danger mt-2 pt-1"><BsFillPersonFill style={iconStyle} /></a>
            </div>
         </div>
      </nav>
   )
}

export default Nav;