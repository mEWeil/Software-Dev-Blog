import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box } from '@chakra-ui/react'

import {useLogin} from '../hooks/utils'

export default function LoginModal({ setUserInfo }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = (data) => {
      useLogin(data, setUserInfo)
      onClose()
  } 

  return (
    <Box>
      <Button 
        variant="solid" 
        bg='space.300' 
        color='space.100'
        _hover={{ bg:'teal' }}
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.username}>
                  <FormLabel>Username:</FormLabel>
                    <Input type='text' id='login-username' {...register('username', {
                      required: 'Username is required'
                    })} />
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <FormLabel>Password:</FormLabel>
                    <Input type='password' id='login-password' {...register('password', {
                      required: 'Password is required'
                    })} />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                    <Input type='submit' />
              </form>
            </ModalBody>

            <ModalFooter>
            </ModalFooter>

          </ModalContent>   
      </Modal>  
    </Box>
  )
}
