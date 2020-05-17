import React, { useState } from 'react';
import AnimeQuery from '../components/AnimeList/animeQuery';

const AnimePage = () => {
   const [search, setSearch] = useState();
   const [newSearch, setNewSearch] = useState();

   return (
      <div className='container'>
         <div className="row">
            <div className="col-md-4 col-sm-6">
               <form className="form-inline input-group my-2" onSubmit={e => e.preventDefault()}>
                  <input id="anime-search-bar" className="form-control" type="text" placeholder="Search" value={search} onChange={e => {
                     setSearch(e.target.value);
                  }} onKeyDown={e => {
                     if(e.key === 'Enter') {
                        setNewSearch(e.target.value);
                        setSearch('');
                     }
                  }} />
               </form>
            </div>
         </div>
         <AnimeQuery perPage={20} search={newSearch} />
      </div>
   )
}

export default AnimePage;