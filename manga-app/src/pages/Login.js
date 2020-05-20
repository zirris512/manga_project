import React from 'react';

function Login() {
   return (
      <div className='container my-4'>
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form>
                  <h3 className='text-center'>Sign In</h3>

                  <div className='form-group'>
                     <label>Email address</label>
                     <input type='email' className='form-control' placeholder='Enter email' />
                  </div>

                  <div className='form-group'>
                     <label>Password</label>
                     <input type='password' className='form-control' placeholder='Enter password' />
                  </div>

                  <div className='form-group'>
                     <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='customCheck1' />
                        <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
                     </div>
                  </div>

                  <button type='submit' className='btn btn-success btn-block'>Submit</button>
                  <p className='forgot-password text-right my-3'>
                     <a href='/register'>Register?</a>
                  </p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Login;