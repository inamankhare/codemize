import React from 'react'
import NavBar from './NavBar'
import Hero from './Hero'
import Scroller from './Scroller'
import Features from './Features'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
        <NavBar/>
        <Hero/>
        <Scroller/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default Home