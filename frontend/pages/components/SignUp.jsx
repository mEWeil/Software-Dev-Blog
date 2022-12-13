import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userSignup = () => {
    axios.post('api/signup', {
      'username': username,
      'email': email,
      'password': password
    })
      .then((response)=>console.log(response))
      .catch((error)=>console.log(error))
  }

  return (
    <div>
      <h1>This is the Sign Up Page</h1>
      <form onSubmit={()=>userSignup()}>
        <label for='username'>User Name:</label>
        <input type='text' 
          id='username'
          name='username'
          placeholder='username' 
          onChange={(event)=>setUsername(event.target.value)}
          ></input>
        <label for='Email'>Email:</label>
        <input 
          type='email' 
          placeholder='email' 
          onChange={(event)=>setEmail(event.target.value)}
          ></input>
        <label for='password'>Password:</label>
        <input 
          type='password' 
          id='password'
          name='password'
          placeholder='password' 
          onChange={(event)=>setPassword(event.target.value)}
          ></input>
        <input type='submit'></input>
      </form>

    </div>
  )
}
