import React from 'react'
import { useRef } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, IconButton, useDisclosure, Button } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { deleteComment } from '../hooks/utils'

export default function DeleteComment({ commentId, setComments}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const deleteHandler = (commentId) => {
    deleteComment(commentId, setComments);
    onClose();
  }

  return (
    <>
      <IconButton margin='.5rem' bg='space.200' size='xs' icon={<DeleteIcon />} onClick={onOpen}/>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>deleteHandler(commentId)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
