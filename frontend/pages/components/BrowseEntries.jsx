import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Text, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import { getPosts } from '../../hooks/utils'
import DeleteAlert from '../../components/DeleteAlert'
import EditModal from '../../components/EditModal'

export default function BrowseEntries({ userInfo }) {
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
              <Text fontSize='lg'>{post.user}</Text>
              {post.user === userInfo.id ?
              <>
                <DeleteAlert postId={post.id} setPosts={setPosts}/>
                <EditModal {...post} setPosts={setPosts} userInfo={userInfo}/>
              </>
              :
              ''}
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
