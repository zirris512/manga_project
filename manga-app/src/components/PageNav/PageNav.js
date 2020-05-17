import React from 'react';

const PageNav = ({ page, setPage, hasNextPage, currentPage, lastPage }) => {
   return (
   <div className="row d-flex justify-content-center">
      <nav aria-label="Page navigation example">
         <div className="mt-3 fixed-bottom position-static">
            <ul className="pagination">
               <li className="page-item">
                  <button className="page-link" aria-label="First" onClick={e => {
                     e.preventDefault();
                     setPage(1);
                  }}>
                     <span aria-hidden="true">&laquo;&laquo;</span>
                  </button>
               </li>
               <li className="page-item">
                  <button className="page-link" aria-label="Previous" onClick={e => {
                     e.preventDefault();
                     if (page !== 1) setPage(page - 1);
                  }}>
                  <span aria-hidden="true">&laquo;</span>
                  </button>
               </li>
               <li className="page-item">
                  <h3 className="mx-3">{currentPage}</h3>
               </li>
               <li className="page-item">
                  <button className="page-link" aria-label="Next" onClick={e => {
                     e.preventDefault();
                     if(hasNextPage) setPage(page + 1)
                  }}>
                  <span aria-hidden="true">&raquo;</span>
                  </button>
               </li>
               <li className="page-item">
                  <button className="page-link" aria-label="Last" onClick={e => {
                     e.preventDefault();
                     setPage(lastPage);
                  }}>
                     <span aria-hidden="true">&raquo;&raquo;</span>
                  </button>
               </li>
            </ul>
         </div>
      </nav>
   </div>
   )
}

export default PageNav;