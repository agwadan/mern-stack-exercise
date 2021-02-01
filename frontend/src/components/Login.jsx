import React from 'react'

export default function Login() {

  const handleSubmit = () => {

  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>

        <div className='form-group'>
          <label>Name</label>
          <input type='text' />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input type='text' />
        </div>

        <button className='btn btn-primary' type='submit'>Sign Up</button>

      </form>
    </div>
  )
}
