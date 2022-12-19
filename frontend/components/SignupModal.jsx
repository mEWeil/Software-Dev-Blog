import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box } from '@chakra-ui/react'

import {useSignup} from '../hooks/utils'


export default function SignupModal() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = (data) => {
    try{
      useSignup(data)
    }
    catch(err){
      console.log('signup failed')
      console.log(err)
    }
  } 

  return (
    <Box>
      <Button 
        as="a" 
        colorScheme='blue'
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <FormLabel>Username:</FormLabel>
                    <Input type='text' id='signup-username' {...register('username', {
                      required: 'Username is required'
                    })} />
                  <FormLabel>Email:</FormLabel>
                    <Input type='email' id='signup-email' {...register('email', {
                      required: 'Email is required'
                    })} />
                  <FormLabel>Password:</FormLabel>
                    <Input type='password' id='signup-password' {...register('password', {
                      required: 'Password is required'
                    })} />
                    <Input type='submit' />
                </FormControl>
              </form>
            </ModalBody>

            <ModalFooter>
            </ModalFooter>

          </ModalContent>   
      </Modal>  
    </Box>
  )
}

