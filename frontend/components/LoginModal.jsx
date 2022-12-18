import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

import {useLogin} from '../hooks/utils'


export default function LoginModal({ setUserStatus, setUserInfo, userInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const onClickHandler = () => {
    let username = document.getElementById('login-username-input').value
    let password = document.getElementById('login-password-input').value
    let data = { 'username': username, 'password': password }
    try{
      useLogin(data, setUserInfo)
      console.log(userInfo)
      setUserStatus(true) // NEED TO SEPERATE THIS OR MAKE IT CONDITIONAL ON SUCCESSFUL LOGIN
      navigate('/')
    }
    catch(err){
      console.log('login failed')
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
          Log In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Log In</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <FormControl>
                <FormLabel>Username:</FormLabel>
                  <Input type='text' id='login-username-input' />
                  {/* <FormHelperText>This will be your personal identifier.</FormHelperText>
                  <FormErrorMessage>Please enter a valid user name.</FormErrorMessage> */}
                <FormLabel>Password:</FormLabel>
                  <Input type='password' id='login-password-input' />
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
