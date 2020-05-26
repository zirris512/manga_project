import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Register = () => {
   const [formInput, setFormInput] = useState({
      user: '',
      password: '',
      password2: ''
   });
   const [errors, setErrors] = useState([]);
   const [redirectTo, setRedirectTo] = useState(null);

   const handleSubmit = async event => {
      event.preventDefault();

      const { user, password, password2 } = formInput;

      const formatUser = user.toLowerCase();

      setErrors([]);

      try {
         const data = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify({ user: formatUser, password, password2 }),
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const response = await data.json();

         if (data.status !== 200) {
            setErrors(response);
         } else {
            console.log(response);
            setRedirectTo('/login');
         }
      } catch (error) {
         console.error(error);
      }
      
   }

   return (
      <div className='container my-4'>
         <ErrorAlert errors={errors} setErrors={setErrors} />
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form onSubmit={handleSubmit}>
                  <h3 className='text-center'>Register</h3>

                  <div className='form-group'>
                     <label>Username</label>
                     <input type='text' name='user' value={formInput.user} onChange={e => setFormInput({...formInput, user: e.target.value})} className='form-control' placeholder='Enter username' />
                  </div>

                  <div className='form-group'>
                     <label>Password</label>
                     <input type='password' name='password' value={formInput.password} onChange={e => setFormInput({...formInput, password: e.target.value})} className='form-control' placeholder='Enter password' />
                  </div>

                  <div className='form-group'>
                     <label>Confirm Password</label>
                     <input type='password' name='password2' value={formInput.password2} onChange={e => setFormInput({...formInput, password2: e.target.value})} className='form-control' placeholder='Re-enter password' />
                  </div>

                  <button type='submit' className='btn btn-success btn-block'>Submit</button>
                  <p className='forgot-password text-right my-3'>
                     <Link to='/login'>Login?</Link>
                  </p>
               </form>
            </div>
         </div>
         {redirectTo && <Redirect to={redirectTo} />}
      </div>
   )
}

export default Register;