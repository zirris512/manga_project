import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
   const [formInput, setFormInput] = useState({
      user: '',
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

   const handleSubmit = event => {
      event.preventDefault();

      const { user, email, password, password2 } = formInput;
      setErrors([]);
      let errorCount = 0;

      if (!user || !email || !password || !password2) {
         setErrors((prevState) => [...prevState, { msg: 'Please fill out all fields!'}]);
         errorCount += 1;
      }
      if (password !== password2) {
         setErrors((prevState) => [...prevState, { msg: 'Password must match!'}]);
         errorCount += 1;
      }
      if (password.length < 6) {
         setErrors((prevState) => [...prevState, { msg: 'Password must be at least 6 characters!'}]);
         errorCount += 1;
      }
      console.log(errorCount)
      if (errorCount === 0) {
         fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(formInput),
            headers: {
               'Content-Type': 'application/json'
            }
         });         
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
                     <label>Username</label>
                     <input type='text' name='user' value={formInput.user} onChange={e => setFormInput({...formInput, user: e.target.value})} className='form-control' placeholder='Enter name' />
                  </div>

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