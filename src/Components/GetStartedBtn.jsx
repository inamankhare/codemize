import { button } from 'framer-motion/client'
import React from 'react'
import { Link } from 'react-router-dom'
import './GetStartedBtn.css'

const GetStartedBtn = () => {
  return (

    <button className='getStartedbtn'>
        <Link className='btnlink' to='/codemize-tool-genRoom'>Get Started</Link>
    </button>
  )
}

export default GetStartedBtn