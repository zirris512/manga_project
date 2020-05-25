import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
   const [formInput, setFormInput] = useState({
      email: '',
      password: '',
      password2: ''
   });
   const [errors, setErrors] = useState([]);

   const errorClose = value => {
      let arr = [...errors];
      arr.splice(value, 1);
      setErrors(arr);
   }

   const handleSubmit = async event => {
      event.preventDefault();

      setErrors([]);

      try {
         const data = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(formInput),
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const response = await data.json();

         console.log(response);

         if (response !== 'OK') {
            setErrors(response);
         }
      } catch (error) {
         console.error(error);
         }
      
   }

   return (
      <div className='container my-4'>
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
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form onSubmit={handleSubmit}>
                  <h3 className='text-center'>Register</h3>

                  <div className='form-group'>
                     <label>Email address</label>
                     <input type='email' name='email' value={formInput.email} onChange={e => setFormInput({...formInput, email: e.target.value})} className='form-control' placeholder='Enter email' />
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
      </div>
   )
}

export default Register;