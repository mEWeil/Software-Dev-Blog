import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Text, Card, CardHeader, CardBody, CardFooter, Accordion, AccordionItem, AccordionButton, 
  AccordionPanel, AccordionIcon, SimpleGrid } from '@chakra-ui/react'

import { getPosts, getComments } from '../../hooks/utils'
import DeleteAlert from '../../components/DeleteAlert'
import EditModal from '../../components/EditModal'
import CreateComment from '../../components/CreateComment'
import EditComment from '../../components/EditComment'
import DeleteComment from '../../components/DeleteComment'

export default function BrowseEntries({ userInfo }) {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  useEffect(()=>{
    getPosts(setPosts)
    getComments(setComments)
  }, [])

  useEffect(()=>{
    console.log('posts: ', posts)
  }, [posts])

  useEffect(()=>{
    console.log('comments: ', comments)
  }, [comments])

  return (
    <Box width='100%' height='100vh'>

      <Box bg='space.200'>
        <Text textColor='space.400' fontSize='xl'>Browse Posts</Text>
      </Box>
      
      <Box bg='rgb(53, 133, 139)' >
        <SimpleGrid paddingTop='2rem' column={2} spacing='2rem'>
          {posts && posts.map(post=>{
            return(
              <Card marginLeft='2rem' marginRight='2rem' bg='space.200'>
                <CardHeader>
                  <Text fontSize='xl'>Title: {post.title}</Text>
                  <Text fontSize='lg'>Author: {post.author}</Text>
                  <Text fontSize='lg'>Topic: {post.entrytype}</Text>

                  {post.user === userInfo.id ?
                  <>
                    <DeleteAlert postId={post.id} setPosts={setPosts}/>
                    <EditModal {...post} setPosts={setPosts} userInfo={userInfo}/>
                  </>
                  :
                  ''}
                  <CreateComment userInfo={userInfo} entryId={post.id} setComments={setComments}/>
                </CardHeader>
                <CardBody>
                  <Text fontSize='lg'>{post.entry}</Text>
                </CardBody>
                <CardFooter>
                <Accordion allowToggle width='80%' allowMultiple='true' marginLeft='auto' marginRight='auto' >
                  {comments
                    .filter(comment => comment.entry === post.id)
                    .map(comment => {
                      return(
                        <AccordionItem bg='space.100'>
                          <Text fontSize='lg' >
                            <AccordionButton borderRadius='10px' _hover={{ bg:'teal' }}>
                              <Box as="span" flex='1' textAlign='left'>
                                {comment.author} says: 
                              </Box>
                              {post.user === userInfo.id ?
                                <>
                                  <EditComment {...comment} setComments={setComments}/>
                                  <DeleteComment commentId={comment.id} setComments={setComments}/>
                                </>
                                :
                                ''
                              } 
                              <AccordionIcon />
                            </AccordionButton>
                          </Text>
                          <AccordionPanel pb={4}>
                            {comment.comment}
                          </AccordionPanel>
                        </AccordionItem>
                      )}
                    )
                  }
                  </Accordion>
                </CardFooter>
              </Card>
            )
          })}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
