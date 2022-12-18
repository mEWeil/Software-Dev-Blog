import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
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

  // FINISH RENAMING FUNCTIONS IN RETURN

  return (
    <>
      <h1>This is the Home Page</h1>    

      {/* <Box>
          <img src={pictureUrls} alt="pexels image"/>
          <button onClick={()=>sendQuote(setDisplayQuote, quotes)}>Get Quote</button>
          <button onClick={()=>sendPicture()}>Get Picture</button> 
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Background Categories
            </MenuButton>
            <MenuList>
              {categories.map(category => {
                <MenuItem>{category.title}</MenuItem>
              })}
            </MenuList>
          </Menu>
          <h3>{displayQuote.q}</h3> 
          <h4>{displayQuote.a}</h4>
      </Box> */}
    </>
  )
}
