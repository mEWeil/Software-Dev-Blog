import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

import {useSignup} from '../hooks/utils'


export default function SignupModal({}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const onClickHandler = () => {
    let username = document.getElementById('signup-username-input').value
    let email = document.getElementById('signup-email-input').value
    let password = document.getElementById('signup-password-input').value
    let data = { 'username': username, 'email': email, 'password': password }
    try{
      useSignup(data)
      // setUserStatus(true)
      // navigate('/')
    }
    catch(err){
      console.log('signup failed')
      console.log(err)
    }
  } 

  return (
    <>
      <Button 
        as="a" 
        variant="ghost" 
        aria-label="About" 
        w="100%" 
        onClick={onOpen}>
          Sign Up
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Sign Up</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <FormControl>
                <FormLabel>Username:</FormLabel>
                  <Input type='text' id='signup-username-input' />
                  {/* <FormHelperText>This will be your personal identifier.</FormHelperText>
                  <FormErrorMessage>Please enter a valid user name.</FormErrorMessage> */}
                <FormLabel>Email:</FormLabel>
                  <Input type='email' id='signup-email-input' />
                  {/* <FormHelperText>This will be your personal identifier.</FormHelperText>
                  <FormErrorMessage>Please enter a valid user name.</FormErrorMessage> */}
                <FormLabel>Password:</FormLabel>
                  <Input type='password' id='signup-password-input' />
                  {/* <FormHelperText>We'll never share your email.</FormHelperText>
                  <FormErrorMessage>Please enter a valid email.</FormErrorMessage> */}
                  <Button 
                    onClick={()=>onClickHandler()}
                    as="a" 
                    variant="ghost" 
                    aria-label="About" 
                    my={5} 
                    w="100%">
                      Submit
                  </Button>
              </FormControl>
            </ModalBody>

            <ModalFooter>
            </ModalFooter>

          </ModalContent>   
      </Modal>  
    </>
  )
}

