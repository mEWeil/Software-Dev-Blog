import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
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
    <>
      <h1>This is the Home Page</h1>    

      <Box border='2px solid black' width='auto' height='auto' >
          <img src={displayPicture} alt="pexels image"/>
          <button onClick={()=>useSendQuote(setDisplayQuote, quotes)}>Refresh Quote</button>
          <button onClick={()=>useSendPicture(setDisplayPicture, pictureUrls)}>Refresh Picture</button> 
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
          {displayQuote ?
            <>
              <h3>{displayQuote.q}</h3> 
              <h4>{displayQuote.a}</h4>
            </>
            :
            <p>Loading...</p>
            }
      </Box>
    </>
  )
}
