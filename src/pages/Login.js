import React, { useState } from 'react'
import {useLogin} from '../hooks/useLogin'

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login,error,isLoading} = useLogin()

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    login(email,password)

  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Log in</h3>
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
      <button type='submit' disabled={isLoading} >Log in</button>

      {error && <div className='error'>{error}</div>}

    </form>
  )
}

