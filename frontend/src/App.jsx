import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/react'

// COMPONENTS
import LoginModal from '../components/LoginModal'
import Logout from '../components/Logout'

// PAGES
import Home from '../pages/components/Home'
import LogIn from '../pages/components/LogIn'
import SignUp from '../pages/components/SignUp'
import NewEntry from '../pages/components/NewEntry'
import BrowseEntries from '../pages/components/BrowseEntries'
// import {Home, LogIn, SignUp, NewEntry, BrowseEntries} from '../pages'

function App() {
  // ARRAY OF 50 OBJECTS WITH QUOTES AND AUTHORS
  const [quotes, setQuotes] = useState([])
  // RANDOMLY SELECTED QUOTE OBJECT TO DISPLAY
  const [displayQuote, setDisplayQuote] = useState({})
  // ARRAY OF OBJECTS BASED ON MY PEXELS COLLECTIONS EX: {title: space, id: 123abc}
  const [categories, setCategories] = useState([])
  // RANDOMLY SELECTED PICTURE FROM CURRENT CATEGORY/THEME
  const [pictureUrls, setPictureUrls] = useState('')
  const [userStatus, setUserStatus] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  // CSRF TOKEN
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
          }
        }
      }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken

  // // SENDS GET REQUEST > DJANGO > API TO RECEIVE QUOTE ARRAY
  // const getQuotes = () => {
  //   axios.get('api/getquotes')
  //   .then((response)=>setQuotes(response.data.data))
  //   .catch((error)=>console.log(error))
  // }

  // // CREATES A RANDOM NUMBER AND PULLS THAT INDEX FROM QUOTE ARRAY TO DISPLAY
  // const sendQuote = () => {
  //   let randNum = Math.floor(Math.random()*50);
  //   console.log(randNum)
  //   setDisplayQuote(quotes[randNum])
  // }

  // // SENDS GET REQUEST > DJANGO > PEXELS TO RECIEVE TITLES AND IDS OF MY COLLECTIONS
  // const getCollectionIds = () => {
  //   axios.get('api/getcollectionids')
  //     .then((response)=>{
  //       let collections = response.data.data.collections;
  //       let collectionArr = [];
  //       collections.map(collection=>{
  //         collectionArr.push({title: collection.title, id: collection.id})
  //       })
  //       setCategories(collectionArr)})
  //     .catch((error)=>console.log(error))
  // }

  // 
  // const getPictureUrls = () => {
  //   axios.get('api/getcollectionurls')
  //   .then((response)=>console.log(response))
  //   .catch((error)=>console.log(error))
  // }

  // const sendPicture = () => {
  //   let randNum = Math.floor(Math.random()*50);
  //   console.log(randNum)
  //   setDisplayQuote(quotes[randNum])
  // }

  // const whoAmI = () => {
  //   axios.get('api/whoami')
  //     .then(console.log('whoAmI fired'))
  //     .then(response => setUserInfo(response.data))
  //     .catch(error => console.log(error))
  // }

  // RETRIEVES QUOTE ARRAY ON INITIAL RENDER
  useEffect(() => {
    console.log('useEffect fired')
    // getQuotes()
    // getCollectionIds()
  }, [])

  // useEffect(()=>{
  //   whoAmI()
  // }, [])

  return (
    <div className="App">

      <Flex>
        <Flex position="fixed" top="1rem" right="1rem" align="center">
          <Flex>
            <Link to=''>
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </Link>

            {userStatus ?
              <Logout setUserStatus={setUserStatus} />
            :
            <>
              <LoginModal setUserStatus={setUserStatus} />

              <Link to='/signup'>
                <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                  Sign Up
                </Button>
              </Link>
            </>
            }

            <Link to='/newentry'>
              <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
                New Entry
              </Button>
            </Link>

            <Link to='/browseentries'>
              <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
                Browse Entries
              </Button>
            </Link>
            </Flex>
          </Flex>
      </Flex>


        {/* {userInfo ?
          <h2>Welcome {userInfo.username}!</h2>
          :
          <h2>Please log in.</h2>} */}

        {/* <img src={pictureUrl} alt="pexels image"/> */}
        {/* <button onClick={()=>sendQuote()}>Get Quote</button>
        <h3>{displayQuote.q}</h3> 
        <h4>{displayQuote.a}</h4> */}

          <Routes>
            <Route path='' element={<Home/>} />
            {/* <Route path='login/' element={<LogIn whoAmI={whoAmI} userStatus={userStatus} setUserStatus={setUserStatus} />} /> */}
            <Route path='signup/' element={<SignUp/>} />
            <Route path='newentry/' element={<NewEntry/>} />
            <Route path='browseentries/' element={<BrowseEntries/>} />
          </Routes>
        
    </div>
  )
}

export default App
