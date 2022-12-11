import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { SplitButton , Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// COMPONENTS
import NavBar from '../components/NavBar'

// PAGES
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import NewEntry from '../pages/NewEntry'
import BrowseEntries from '../pages/BrowseEntries'

function App() {
  // ARRAY OF 50 OBJECTS WITH QUOTES AND AUTHORS
  const [quotes, setQuotes] = useState([])
  // RANDOMLY SELECTED QUOTE OBJECT TO DISPLAY
  const [displayQuote, setDisplayQuote] = useState({})
  // ARRAY OF OBJECTS BASED ON MY PEXELS COLLECTIONS EX: {title: space, id: 123abc}
  const [categories, setCategories] = useState([])
  // RANDOMLY SELECTED PICTURE FROM CURRENT CATEGORY/THEME
  const [pictureUrls, setPictureUrls] = useState('')

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

  // SENDS GET REQUEST > DJANGO > PEXELS TO RECIEVE TITLES AND IDS OF MY COLLECTIONS
  const getCollectionIds = () => {
    axios.get('api/getcollectionids')
      .then((response)=>{
        let collections = response.data.data.collections;
        let collectionArr = [];
        collections.map(collection=>{
          collectionArr.push({title: collection.title, id: collection.id})
        })
        setCategories(collectionArr)})
      .catch((error)=>console.log(error))
  }

  // 
  const getPictureUrls = () => {
    axios.get('api/getcollectionurls')
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
  }

  // const sendPicture = () => {
  //   let randNum = Math.floor(Math.random()*50);
  //   console.log(randNum)
  //   setDisplayQuote(quotes[randNum])
  // }

  

  // RETRIEVES QUOTE ARRAY ON INITIAL RENDER
  useEffect(() => {
    console.log('useEffect fired')
    // getQuotes()
    // getCollectionIds()
  }, [])

  useEffect(() => {
    console.log('in useEffect: ', categories)
  }, [categories])

  return (

    

    <div className="App">

      <NavBar/>

      <h1>App Screen</h1>
      <SplitButton
        key='Primary'
        id={'dropdown-split-variants-Primary'}
        variant='Primary'
        title='Primary'
        >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </SplitButton>
      {/* <img src={pictureUrl} alt="pexels image"/> */}
      {/* <button onClick={()=>sendQuote()}>Get Quote</button>
      <h3>{displayQuote.q}</h3> 
      <h4>{displayQuote.a}</h4> */}

      <Router hashType='hashbang' >
        <Routes>
          <Route path='' element={<Home/>} />
          <Route path='signin/' element={<SignIn/>} />
          <Route path='signup/' element={<SignUp/>} />
          <Route path='newentry/' element={<NewEntry/>} />
          <Route path='browseentries/' element={<BrowseEntries/>} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
