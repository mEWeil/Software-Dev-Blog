import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Text, Card, CardHeader, CardBody, CardFooter, Accordion, AccordionItem, AccordionButton, 
  AccordionPanel, AccordionIcon, } from '@chakra-ui/react'

import { getPosts, getComments } from '../../hooks/utils'
import DeleteAlert from '../../components/DeleteAlert'
import EditModal from '../../components/EditModal'
import CreateComment from '../../components/CreateComment'
import EditComment from '../../components/EditComment'

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
    <Box>
      <Text fontSize='xl'>This is the Browse Posts Page</Text>
      {posts && posts.map(post=>{
        return(
          <Card>
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
            <Accordion allowToggle>
              {comments
                .filter(comment => comment.entry === post.id)
                .map(comment => {
                  return(
                    <AccordionItem>
                      <Text fontSize='lg'>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            {comment.author} says: 
                          </Box>
                          {post.user === userInfo.id ?
                            <EditComment {...comment} setComments={setComments}/>

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
    </Box>
  )
}
