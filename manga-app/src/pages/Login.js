import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Login = (props) => {
   const [credentials, setCredentials] = useState({
      user: '',
      password: '',
      remember: false
   });
   const [errors, setErrors] = useState([]);
   const [redirectTo, setRedirectTo] = useState(null);

   useEffect(() => {
      if (localStorage.remember && localStorage.email !== '') {
         setCredentials({...credentials, remember: localStorage.remember, email: localStorage.email})
      }
   }, []);

   const checkRemember = (user, remember) => {
      if (remember && user !== '') {
         localStorage.user = user;
         localStorage.remember = remember;
      }
      if (!remember && localStorage.remember && localStorage.user) {
         localStorage.removeItem('user');
         localStorage.removeItem('remember');
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors([]);
      const { user, password, remember } = credentials;

      const formatUser = user.toLowerCase();

      checkRemember(user, remember);

      try {
         const data = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({ user: formatUser, password }),
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const response = await data.json();
         
         if (data.status !== 200) {
            setErrors((prevState) => [...prevState, { msg: 'An error has occurred' }])
         } else {
            props.setLoggedIn(true);
            props.setUser(response.user.user);
            setRedirectTo('/dashboard');
         }

      } catch (err) {
         console.error(err);
      }
   }

   return (
      <div className='container my-4'>
         <ErrorAlert errors={errors} setErrors={setErrors} />
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form onSubmit={handleSubmit}>
                  <h3 className='text-center'>Sign In</h3>

                  <div className='form-group'>
                     <label>Username</label>
                     <input type='text' className='form-control' placeholder='Enter username' value={credentials.user} onChange={e => setCredentials({...credentials, user: e.target.value})} />
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
         {redirectTo && <Redirect to={redirectTo} />}
      </div>
   )
}

export default Login;