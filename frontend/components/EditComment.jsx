import React from 'react'
import { useForm } from 'react-hook-form'
import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { updateComment } from '../hooks/utils'

export default function EditComment({ id, comment, user, entry, setComments }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      newComment: comment
    }
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = (data) => {
    let comment = data.newComment
    let update = { 'comment': comment, 'user': user, 'entry': entry }
    console.log('update: ', update)
    updateComment(id, update, setComments)
    onClose()
  }

  return (
    <>
      <IconButton aria-label='Edit-Post' icon={<EditIcon />} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>

            <ModalHeader>Edit Comment</ModalHeader>

            <ModalCloseButton />

            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <FormControl isInvalid={}> */}
                  <FormLabel>Comment:</FormLabel>
                    <Input type='text' id='editComment' {...register('newComment', {
                      required: 'foo'
                    })} />
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
