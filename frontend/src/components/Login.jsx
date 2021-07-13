import React, { useState } from 'react';

export default function Login() {

  const [user, setUser] = useState({
    name: '',
    password: ''
  });
  //const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>

        <div className='form-group'>
          <label>Name</label>
          <input
            className='form-control'
            type='text'
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name} />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            className='form-control'
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </div>

        <button className='btn btn-primary' type='submit'>Log In</button>

      </form>
    </div>
  )
}
