import './App.css'
import axios from 'axios'
import { useState } from 'react'
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

          <Flex bg='space.100' position="static" minWidth='max-content' alignItems='center' gap='2'>

            <Box p='2'>
              {userInfo !== false & userInfo !== 'failed' ?
                <Heading textColor='space.400' >Welcome {userInfo['username']}!</Heading>
                :
                <Heading textColor='space.400' >Please log in.</Heading>}
            </Box>

            <Spacer />

            <ButtonGroup spacing='1rem'>
              <Link to=''>
                <Button bg='space.300' color='space.100' _hover={{ bg:'teal' }} variant="solid" w="100%">
                  Home
                </Button>
              </Link>

              {userInfo !== false & userInfo !== 'failed' ?
                <>
                  <Logout setUserInfo={setUserInfo} />

                  <Link to='/newentry'>
                    <Button bg='space.300' color='space.100' _hover={{ bg:'teal' }} variant="solid" w="100%">
                      New Entry
                    </Button>
                  </Link>

                  <Link to='/browseentries'>
                    <Button bg='space.300' color='space.100' _hover={{ bg:'teal' }} variant="solid" w="100%">
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