import React from 'react';

const ErrorAlert = ({ errors, setErrors }) => {
   const errorClose = value => {
      let arr = [...errors];
      arr.splice(value, 1);
      setErrors(arr);
   }

   return (
      <>
         {errors && errors.map((value, key) => (
            <div className='row d-flex justify-content-center' key={key}>
               <div className='col-md-4 error-msgs'>
                  <div className='alert alert-danger alert-dismissible' role='alert'>
                     <p>{value.msg}</p>
                     <button type='button' className='close' value={key} onClick={e => errorClose(e.currentTarget.value)}>
                        <span aria-hidden='true'>&times;</span>
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </>
   )
}

export default ErrorAlert;