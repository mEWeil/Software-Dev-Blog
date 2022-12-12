import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function LogIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = () => {
    axios.post('api/login', {
      'username': username,
      'password': password
    })
      .then((response)=>console.log(response))
      .catch((error)=>console.log(error))
  }

  const userLogout = () => {
    axios.options('api/logout')
      .then((response)=>console.log(response))
      .catch((error)=>console.log(error))
  }

  return (
    <div>
      <h1>This is the Log In Page</h1>
      <form onSubmit={()=>userLogin()}>
        <label for='username'>User Name:</label>
        <input type='text' 
          id='username'
          name='username'
          placeholder='username' 
          onChange={(event)=>setUsername(event.target.value)}
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
      <button onClick={()=>userLogout()}>Log Out</button>
    </div>
  )
}
