import React, { useState } from 'react';
import ApiQuery from '../components/Query/ApiQuery'

const AnimePage = ({ type }) => {
   const [newSearch, setNewSearch] = useState();

   return (
      <div className='container'>
         <div className='row'>
            <div className='col-md-4 col-sm-6'>
               <form className='form-inline input-group my-2' onSubmit={e => e.preventDefault()}>
                  <input id='search-bar' className='form-control' type='text' placeholder='Search' onKeyDown={e => {
                     if(e.key === 'Enter') {
                        setNewSearch(e.target.value);
                        e.target.value = '';
                     }
                  }} />
               </form>
            </div>
         </div>
         <ApiQuery perPage={20} search={newSearch} type={type} />
      </div>
   )
}

export default AnimePage;