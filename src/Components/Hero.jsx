import React , {useEffect} from 'react'
import heroImage from '../Assets/heroimage.svg'
import GetStartedBtn from './GetStartedBtn'
import './Hero.css'
import { Typewriter } from 'react-simple-typewriter'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import ScrollTrigger from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

    const tl=gsap.timeline();


    useGSAP(()=>{
        tl.from('.Hero-Title',{
            opacity:0,
            duration:1,
            delay:.5,
            
            y:100
        })

        tl.from('.image-hero',{
            opacity:0,
            duration:2,
            delay:.5,
            
        })

        tl.from('.herobtn',{
            opacity:0,
            duration:1,
            delay:0,
            y:100
            
        })

        tl.from('.heropara',{
            opacity:0,
            duration:1,
            delay:0,
            y:100
            
        })
    })



    




   
  return (

   

    <div className='Hero-class'>
        <div className='Hero-Title'>

         <h1 id= 'Title' className='title-1 '>Unlock Efficient Collaboration</h1>
         {/* <h1 className='title-2 '>Real-time coding</h1> */}

         <div className='title-2'>
         <Typewriter
            words={['Real-time coding', 'Collaborative Editing', 'Code', 'Effortless Pairing!']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            className="Text"
            
        
          />
         </div>
        
         

         
    </div>

    <img className="image-hero" src={heroImage} alt="" />



   
    <div className='herobtn'>
    <GetStartedBtn />
    </div>
    

    <div className='heropara'>
    <p  className='para1'>Unlock the Power of Collaborative Coding</p>
    <p >Collaborate, code, repeat.</p>
    </div>
    





    </div>
     
    
  )
}

export default Hero