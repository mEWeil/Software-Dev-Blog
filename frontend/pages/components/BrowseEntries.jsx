import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter, IconButton } from '@chakra-ui/react'

import { getPosts } from '../../hooks/utils'

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
              <IconButton aria-label='Delete' icon={<DeleteIcon />} />
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
