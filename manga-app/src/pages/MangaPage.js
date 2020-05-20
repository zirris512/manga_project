import React, { useState } from 'react';
import MangaQuery from '../components/MangaList/mangaQuery'

const MangaPage = () => {
   const [search, setSearch] = useState();
   const [newSearch, setNewSearch] = useState();

   return (
      <div className='container'>
         <div className='row'>
            <div className='col-md-4 col-sm-6'>
               <form className='form-inline input-group my-2' onSubmit={e => e.preventDefault()}>
                  <input id='search-bar' className='form-control' type='text' placeholder='Search' value={search} onChange={e => {
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
         <MangaQuery perPage={20} search={newSearch} />
      </div>
   )
}

export default MangaPage;