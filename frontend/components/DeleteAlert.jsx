import React from 'react'
import { useRef } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, IconButton, useDisclosure, Button } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { deletePost } from '../hooks/utils'

export default function DeleteAlert({ postId, setPosts }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const deleteHandler = (postId) => {
    deletePost(postId, setPosts);
    onClose();
  }

  return (
    <>
      <IconButton bg='space.300' size='sm' aria-label='Delete' icon={<DeleteIcon />} onClick={onOpen}/>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>deleteHandler(postId)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
