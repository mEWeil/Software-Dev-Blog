import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Text, FormControl, FormLabel, FormErrorMessage, Textarea, Input, VStack } from '@chakra-ui/react'

import { createPost } from '../../hooks/utils'

export default function NewEntry({ userInfo }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      author: userInfo.username
    }
  })

  const onSubmit = (data) => {
    createPost(data)
    reset()
  }

  console.log(userInfo.username)

  return (
    <Box bg='space.300'>

      <Box>
        <Text bg='space.200' textColor='space.400' fontSize='xl' >Create a New Post</Text>
      </Box>
      
      <Box width='100%' height='100vh'>
        <Box margin='2rem'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing='2rem'>
              <FormControl isInvalid={errors.postTitle}>
                <FormLabel textColor='space.400'>Post Title: </FormLabel>
                  <Input bg='white' type='text' {...register('postTitle', {
                    required: 'Post title is required'
                  })}/>
                  <FormErrorMessage>
                    {errors.postTitle && errors.postTitle.message}
                  </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.postTitle}>
                <FormLabel textColor='space.400'>Post Topic: </FormLabel>
                  <Input bg='white' type='text' {...register('postTopic', {
                    required: 'Post topic is required'
                  })}/>
                  <FormErrorMessage>
                    {errors.postTitle && errors.postTopic.message}
                  </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.post}>
                <FormLabel textColor='space.400'>Post: </FormLabel>
                  <Textarea bg='white' {...register('post', {
                    required: 'Post content is required.'
                  })}/>
                <FormErrorMessage>
                  {errors.post && errors.post.message}
                </FormErrorMessage>
              </FormControl>
              <Input bg='space.400' textColor='space.100' type='submit' />
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
