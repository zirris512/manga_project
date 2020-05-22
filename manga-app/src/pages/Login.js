import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
   const [credentials, setCredentials] = useState({
      email: '',
      password: '',
      remember: false
   });

   useEffect(() => {
      if (localStorage.remember && localStorage.email !== '') {
         setCredentials({...credentials, remember: localStorage.remember, email: localStorage.email})
      }
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      const { email, remember} = credentials;

      if (remember && email !== '') {
         localStorage.email = email;
         localStorage.remember = remember;
      }
      if (!remember && localStorage.remember && localStorage.email) {
         localStorage.removeItem('email');
         localStorage.removeItem('remember');
      }
   }

   return (
      <div className='container my-4'>
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form onSubmit={handleSubmit}>
                  <h3 className='text-center'>Sign In</h3>

                  <div className='form-group'>
                     <label>Email address</label>
                     <input type='email' className='form-control' placeholder='Enter email' value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} />
                  </div>

                  <div className='form-group'>
                     <label>Password</label>
                     <input type='password' className='form-control' placeholder='Enter password' value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} />
                  </div>

                  <div className='form-group'>
                     <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='customCheck1' checked={credentials.remember} onChange={e => setCredentials({...credentials, remember: e.target.checked})}/>
                        <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
                     </div>
                  </div>

                  <button type='submit' className='btn btn-success btn-block'>Submit</button>
                  <p className='forgot-password text-right my-3'>
                     <Link to='/register'>Register?</Link>
                  </p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Login;