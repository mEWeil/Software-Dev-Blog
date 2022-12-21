import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'

import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import { getPosts } from '../../hooks/utils'
import DeleteAlert from '../../components/DeleteAlert'

export default function BrowseEntries() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    getPosts(setPosts)
  }, [])

  return (
    <Box>
      <Text fontSize='xl'>This is the Browse Entries Page</Text>
      {posts && posts.map(post=>{
        return(
          <Card>
            <CardHeader>
              <Text fontSize='xl'>{post.title}</Text>
              <Text fontSize='lg'>{post.id}</Text>
              <DeleteAlert postId={post.id} setPosts={setPosts}/>
            </CardHeader>
            <CardBody>
              <Text fontSize='lg'>{post.entry}</Text>
            </CardBody>
          </Card>
        )
      })}
    </Box>
  )
}
