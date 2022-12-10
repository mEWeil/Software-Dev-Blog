import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { navbar, nav } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

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
  const [pictureUrl, setPictureUrl] = useState('')

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
        console.log('collections: ', collections)
        let collectionArr = [];
        collections.map(collection=>{
          collectionArr.push({title: collection.title, id: collection.id})
          console.log('collectionArr inside map: ', collectionArr)
        })
        console.log('collectionArr outside map: ', collectionArr)
        setCategories(collectionArr)})
      .catch((error)=>console.log(error))
  }

  // 
  const getCollectionUrls = () => {
    axios.get('api/getcollectionurls')
    .then((response)=>setPictureUrl(response.data.data.media[0].src.original))
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
  }, [])

  useEffect(() => {
    console.log('in useEffect: ', categories)
  }, [categories])

  return (

    

    <div className="App">

      <NavBar/>

      <h1>App Screen</h1>
      <button onClick={()=>getCollectionIds()}>Get Picture</button>
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
