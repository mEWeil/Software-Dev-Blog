import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Textarea, Input } from '@chakra-ui/react'

import { createPost } from '../../hooks/utils'

export default function NewEntry() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = (data) => {
    createPost(data)
  }

  return (
    <Box>
      <Text fontSize='xl'>This is the New Entry Page</Text>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.postTitle}>
            <FormLabel>Post Title: </FormLabel>
              <Input type='text' {...register('postTitle', {
                required: 'Post title is required'
              })}/>
              <FormErrorMessage>
                {errors.postTitle && errors.postTitle.message}
              </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.post}>
            <FormLabel>Post: </FormLabel>
              <Textarea {...register('post', {
                required: 'Post content is required.'
              })}/>
            <FormErrorMessage>
              {errors.post && errors.post.message}
            </FormErrorMessage>
          </FormControl>
          <Input type='submit' />
        </form>
      </Box>
    </Box>
  )
}
