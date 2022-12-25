import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

export default function IncorrectLoginAlert({ setUserInfo }) {

  setTimeout(() => {
    setUserInfo(false)
  }, "3000")

  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Login Failed!</AlertTitle>
      <AlertDescription>Your username or password was incorrect.</AlertDescription>
    </Alert>
  )
}
