import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Flex, Button, Text, Box } from '@chakra-ui/react' 

import { getCookie } from '../hooks/utils'

// COMPONENTS
import LoginModal from '../components/LoginModal'
import SignupModal from '../components/SignupModal'
import Logout from '../components/Logout'
import PrivateRoutes from '../pages/components/PrivateRoutes'

// PAGES
import Home from '../pages/components/Home'
import NewEntry from '../pages/components/NewEntry'
import BrowseEntries from '../pages/components/BrowseEntries'

export default function App() {
  const [userInfo, setUserInfo] = useState(false)

  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken

  return (
    <Box className="App">

      <Flex>
        <Flex border='2px solid black' position="fixed" right="1rem" align="center">
          <Flex>
            <Link to=''>
              <Button as="a" colorScheme='blue' variant="ghost" aria-label="Home" w="100%">
                Home
              </Button>
            </Link>

            {userInfo ?
              <>
                <Logout setUserInfo={setUserInfo} />

                <Link to='/newentry'>
                  <Button as="a" colorScheme='blue' variant="ghost" aria-label="Contact" w="100%">
                    New Entry
                  </Button>
                </Link>

                <Link to='/browseentries'>
                  <Button as="a" colorScheme='blue' variant="ghost" aria-label="Contact" w="100%">
                    Browse Entries
                  </Button>
                </Link>
              </>
            :
            <>
              <LoginModal setUserInfo={setUserInfo} />

              <SignupModal />
            </>
            }

            

          </Flex>
        </Flex>
      </Flex>


        {userInfo ?
          <Text fontSize='xl' >Welcome {userInfo['username']}!</Text>
          :
          <Text fontSize='xl' >Please log in.</Text>}

      <Routes>
        <Route path='' element={<Home/>} />
        <Route element={<PrivateRoutes userInfo={userInfo}/>}>
          <Route path='newentry/' element={<NewEntry/>} />
          <Route path='browseentries/' element={<BrowseEntries userInfo={userInfo}/>} />
        </Route>
      </Routes>
        
    </Box>
  )
}