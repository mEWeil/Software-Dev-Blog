import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Flex, Button, Text, Box, Heading, Spacer, ButtonGroup } from '@chakra-ui/react' 

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

       {userInfo === 'failed' ?
        <IncorrectLoginAlert setUserInfo={setUserInfo}/>
        :
        ''
       }

          <Flex bg='rgb(174, 254, 255)' position="static" minWidth='max-content' alignItems='center' gap='2'>

            <Box p='2'>
              {userInfo ?
                <Heading  >Welcome {userInfo['username']}!</Heading>
                :
                <Heading  >Please log in.</Heading>}
            </Box>

            <Spacer />

            <ButtonGroup isAttached='true' spacing='1rem'>
              <Link to=''>
                <Button as="a" colorScheme='teal'  variant="solid" w="100%">
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
            </ButtonGroup>
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