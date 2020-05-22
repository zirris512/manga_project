import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
   const [formInput, setFormInput] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   });

   const handleSubmit = event => {
      event.preventDefault();
      if (formInput.password !== formInput.password2) {
         return console.error('Passwords must match!')
      }
      console.log(formInput);
   }

   return (
      <div className='container my-4'>
         <div className='row d-flex justify-content-center'>
            <div className='col-md-4 login-form'>
               <form onSubmit={handleSubmit}>
                  <h3 className='text-center'>Register</h3>

                  <div className='form-group'>
                     <label>Name</label>
                     <input type='text' name='name' value={formInput.name} onChange={e => setFormInput({...formInput, name: e.target.value})} className='form-control' placeholder='Enter name' />
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