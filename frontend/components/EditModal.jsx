import React from 'react'
import { useForm } from 'react-hook-form'
import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { updatePost } from '../hooks/utils'

export default function EditModal({ title, entry, id, entrytype, setPosts, userInfo }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      postTitle: title,
      post: entry
    }
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = (data) => {
    let title = data.postTitle
    let entry = data.post
    let user = userInfo.id
    let update = { 'title': title, 'entry': entry, 'entrytype': entrytype, 'user': user }
    console.log('update: ', update)
    updatePost(id, update, setPosts)
    onClose()
  }

  return (
    <>
      <IconButton size='sm' icon={<EditIcon />} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Edit Post</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <FormControl isInvalid={}> */}
                  <FormLabel>Post Title:</FormLabel>
                    <Input type='title' id='editTitle' {...register('postTitle', {
                      required: 'foo'
                    })} />
                    {/* <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage> */}
                {/* </FormControl> */}
                {/* <FormControl isInvalid={errors.password}> */}
                  <FormLabel>Post:</FormLabel>
                    <Input type='post' id='editPost' {...register('post', {
                      required: 'bar'
                    })} />
                    {/* <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage> */}
                {/* </FormControl> */}
                    <Input type='submit' />
              </form>
            </ModalBody>

            <ModalFooter>
            </ModalFooter>

          </ModalContent>   
      </Modal> 
    </>
  )
}
