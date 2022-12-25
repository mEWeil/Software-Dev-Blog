import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Flex, Button, Text, Box, Heading, Spacer } from '@chakra-ui/react' 

import { getCookie } from '../hooks/utils'

// COMPONENTS
import LoginModal from '../components/LoginModal'
import SignupModal from '../components/SignupModal'
import Logout from '../components/Logout'
import PrivateRoutes from '../pages/components/PrivateRoutes'
import IncorrectLoginAlert from '../components/IncorrectLoginAlert'

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

       {userInfo === null ?
        <IncorrectLoginAlert setUserInfo={setUserInfo}/>
        :
        ''
       }

      <Flex>
        <Flex position="relative" right="1rem" align="center">
        {userInfo ?
          <Text fontSize='xl' >Welcome {userInfo['username']}!</Text>
          :
          <Text fontSize='xl' >Please log in.</Text>}
          <Flex>
            <Link to=''>
              <Button as="a" colorScheme='teal' variant="outline" w="100%">
                Home
              </Button>
            </Link>

            {userInfo ?
              <>
                <Logout setUserInfo={setUserInfo} />

                <Link to='/newentry'>
                  <Button as="a" colorScheme='teal' variant="outline" w="100%">
                    New Entry
                  </Button>
                </Link>

                <Link to='/browseentries'>
                  <Button as="a" colorScheme='teal' variant="outline" w="100%">
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

      <Routes>
        <Route path='' element={<Home/>} />
        <Route element={<PrivateRoutes userInfo={userInfo}/>}>
          <Route path='newentry/' element={<NewEntry userInfo={userInfo}/>} />
          <Route path='browseentries/' element={<BrowseEntries userInfo={userInfo}/>} />
        </Route>
      </Routes>
        
    </Box>
  )
}