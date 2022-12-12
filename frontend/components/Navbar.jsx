import React from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function navBar() {
  return (
    <NavBar>
      <button><Nav.Link href='#/'>Home</Nav.Link></button>
      <button><Nav.Link href='#/login'>Log In</Nav.Link></button>
      <button><Nav.Link href='#/signup'>Sign Up</Nav.Link></button>
      <button><Nav.Link href='#/newentry'>Create New Entry</Nav.Link></button>
      <button><Nav.Link href='#/browseentries'>Browse Entries</Nav.Link></button>
    </NavBar>
  )
}
