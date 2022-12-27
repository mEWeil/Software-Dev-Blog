import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Menu, MenuButton, MenuList, MenuItem, Button, Text, Image, Center, ButtonGroup } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import { useGetQuotes, useSendQuote, useGetCollectionIds, useGetPictureUrls, useSendPicture } from '../../hooks/utils'

export default function Home() {
  // ARRAY OF 50 OBJECTS WITH QUOTES AND AUTHORS
  const [quotes, setQuotes] = useState([])
  // RANDOMLY SELECTED QUOTE OBJECT TO DISPLAY
  const [displayQuote, setDisplayQuote] = useState({})
  // ARRAY OF OBJECTS BASED ON MY PEXELS COLLECTIONS EX: {title: space, id: 123abc}
  const [categories, setCategories] = useState([])
  // ARRAY OF 15 OBJECTS FOR PICTURES
  const [pictureUrls, setPictureUrls] = useState(null)
  // RANDOMLY SELECTED PICTURE FROM CURRENT CATEGORY/THEME
  const [displayPicture, setDisplayPicture] = useState('')

  const boxImage = {
    backgroundImage: 'url(' +displayPicture+ ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  // RETRIEVES QUOTE ARRAY ON INITIAL RENDER
  useEffect(() => {
    useGetQuotes(setQuotes)
    useGetCollectionIds(setCategories)
  }, [])

  useEffect(() => {
    useSendQuote(setDisplayQuote, quotes)
  }, [quotes])

  useEffect(() => {
    useGetPictureUrls(setPictureUrls, {'id': 'oy45lci'})
  }, [categories])

  useEffect(() => {
    pictureUrls ?
    useSendPicture(setDisplayPicture, pictureUrls)
    :
    ''
  }, [pictureUrls])

  return (
    <Box>

      <Box bg='space.200'>
        <Text fontSize='xl' textColor='space.400' >Home</Text>   
      </Box> 


      <Box style={boxImage} bg='space.400' width='100%' height='100vh' >

        {displayQuote ?
          <Center display='inline-block' top='35%' padding='20px' marginLeft='auto' marginRight='auto' position='relative' bg='rgb(174, 254, 255)' borderRadius='10px'>
              <Text fontSize='2xl'>{displayQuote.q}</Text> 
              <Text fontSize='xl'>{displayQuote.a}</Text>
          </Center>
          :
          <Center display='inline-block' top='35%' padding='10px' marginLeft='auto' marginRight='auto' position='relative' bg='rgb(174, 254, 255)'>
            <Text fontSize='xl'>Loading...</Text>
          </Center>
        }

        <ButtonGroup variant="solid" size='xs' position='fixed' bottom='0' right='0' isAttached='true'>
          <Button onClick={()=>useSendQuote(setDisplayQuote, quotes)} bg='space.300' color='white' _hover={{ bg:'teal' }} >Refresh Quote</Button>
          <Button onClick={()=>useSendPicture(setDisplayPicture, pictureUrls)} bg='space.300' color='white' _hover={{ bg:'teal' }} >Refresh Picture</Button> 
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronUpIcon />} bg='space.300' color='white' _hover={{ bg:'teal' }}>
              Background Categories
            </MenuButton>
            <MenuList>
              {categories.map(category => {
                return(
                <MenuItem onClick={()=>useGetPictureUrls(setPictureUrls, {'id': category.id})} >{category.title}</MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        </ButtonGroup>  

      </Box>
    </Box>
  )
}
