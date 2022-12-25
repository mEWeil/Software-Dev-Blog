import React from 'react'
import { useForm } from 'react-hook-form'
import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

import { createComment } from '../hooks/utils'

export default function CreateComment({ userInfo, entryId, setComments }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      author: userInfo.username,
      user: userInfo.id,
      entry: entryId,
    }
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = (data) => {
    let comment = data.comment
    let author = userInfo.username
    let user = userInfo.id
    let entry = entryId
    let newComment = { 'comment': comment, 'author': author, 'user': user, 'entry': entry }
    console.log('newComment: ', newComment)
    createComment(newComment, setComments)
    onClose()
  }

  return (
    <>
      <IconButton aria-label='Edit-Post' icon={<ChatIcon />} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Add a Comment</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <FormControl isInvalid={}> */}
                  <FormLabel>Speak your truth:</FormLabel>
                    <Input type='text' id='comment' {...register('comment', {
                      required: 'foo'
                    })} />
                    {/* <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage> */}
                {/* </FormControl> */}
                {/* <FormControl isInvalid={errors.password}> */}
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
