import React from 'react'
import logo from '../Assets/codemize.png'
import { Link } from 'react-router-dom'
import GetStartedBtn from './GetStartedBtn'
import './NavBar.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'





const NavBar = () => {

    const tl= gsap.timeline();

    useGSAP(()=>{
        tl.from('.Nav',{
            opacity:0,
            y:-10,
            duration:1,
            delay:0,
            stagger:1


        })
    })


  return (
    <div className='Main-Nav'>
    <div className='Nav'>
        <div className='logo'>
            <img src={logo} alt="Codemize logo" />
        </div>

        <ul className='navlinks'>
            <li>
                <Link className='link' to="/">Home</Link>
            </li>
            <li>
                <Link className='link' to="/about">About</Link>
            </li>
            <li>
                <Link className='link' to="/Contact">Contact</Link>
            </li>

            <li>
                <Link className='link' to="/More">More</Link>
            </li>
        </ul>

        <GetStartedBtn/>

        
        
    </div>
    <div className='Line'></div>


    
   

    </div>
  )
}

export default NavBar