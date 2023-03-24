import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {signup,isLoading,error} = useSignup()

  const handleSubmit =  (e)=>{
    e.preventDefault();
    signup(email,password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label>Email:</label>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}        
      />
      <label>Password:</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}        
      />

      <button type='submit' disabled={isLoading} >Sign up</button>

      {error && <div className='error'>{error}</div>}

    </form>
  )
}

