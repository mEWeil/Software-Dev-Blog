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
  // RANDOMLY SELECTED PICTURE FROM CURRENT CATEGORY/THEME
  const [pictureUrls, setPictureUrls] = useState('')

  // RETRIEVES QUOTE ARRAY ON INITIAL RENDER
  useEffect(() => {
    console.log('useEffect fired')
    useGetQuotes(setQuotes)
    useGetCollectionIds(setCategories)
  }, [])

  useEffect(() => {
    useSendQuote(setDisplayQuote, quotes)
  }, [quotes])

  return (
    <>
      <h1>This is the Home Page</h1>    

      <Box border='2px solid black' width='auto' height='auto' >
          <img src={pictureUrls} alt="pexels image"/>
          <button onClick={()=>useSendQuote(setDisplayQuote, quotes)}>Get Quote</button>
          <button onClick={()=>console.log(categories)}>Get Picture</button> 
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
