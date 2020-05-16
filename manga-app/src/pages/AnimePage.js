import React, { useState } from 'react';
import AnimeQuery from '../components/AnimeList/animeQuery';

const AnimePage = () => {
   const [search, setSearch] = useState();
   const [newSearch, setNewSearch] = useState();
   const [page, setPage] = useState(1);

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
         <AnimeQuery perPage={20} search={newSearch} page={page} />
         <nav aria-label="Page navigation example">
            <div className="d-flex justify-content-center mt-3">
               <ul class="pagination">
                  <li class="page-item mx-3">
                     <button class="page-link btn-lg" aria-label="Previous" onClick={e => {
                        e.preventDefault();
                        if (page !== 1) setPage(page - 1);
                     }}>
                     <span aria-hidden="true">&laquo;</span>
                     </button>
                  </li>
                  <li class="page-item mx-3">
                     <button class="page-link btn-lg" aria-label="Next" onClick={e => {
                        e.preventDefault();
                        setPage(page + 1);
                     }}>
                     <span aria-hidden="true">&raquo;</span>
                     </button>
                  </li>
               </ul>
            </div>
         </nav>
      </div>
   )
}

export default AnimePage;