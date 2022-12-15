import React from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { useLogout, getCookie } from '../hooks/utils'

export default function Logout({ setUserStatus }) {
  const navigate = useNavigate()

  const csrftoken = getCookie('csrftoken');
  

  const onClickHandler = (data) => {
    axios.defaults.headers.common["X-CSRFToken"]=csrftoken
    try{
      
      useLogout(data)
      setUserStatus(false)
      navigate('/')
    }
    catch(err){
      console.log('logout failed')
      console.log(err)
    }
  } 

  return (
    <Button 
      onClick={()=>onClickHandler()}
      as="a" 
      variant="ghost" 
      aria-label="About" 
      my={5} 
      w="100%">
        Log Out
    </Button>
  )
}
