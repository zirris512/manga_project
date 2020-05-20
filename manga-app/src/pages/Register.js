import React from 'react';

function Register() {
   return (
      <div className='container my-4'>
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form>
                  <h3 className='text-center'>Register</h3>

                  <div className='form-group'>
                     <label>Name</label>
                     <input type='text' className='form-control' placeholder='Enter name' />
                  </div>

                  <div className='form-group'>
                     <label>Email address</label>
                     <input type='email' className='form-control' placeholder='Enter email' />
                  </div>

                  <div className='form-group'>
                     <label>Password</label>
                     <input type='password' className='form-control' placeholder='Enter password' />
                  </div>

                  <div className='form-group'>
                     <label>Confirm Password</label>
                     <input type='password' className='form-control' placeholder='Re-enter password' />
                  </div>

                  <button type='submit' className='btn btn-success btn-block'>Submit</button>
                  <p className='forgot-password text-right my-3'>
                     <a href='/login'>Login?</a>
                  </p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Register;