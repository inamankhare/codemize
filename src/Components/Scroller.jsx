import React,{useEffect} from 'react'
import './Scroller.css'
import VideoCarousel from './VideoCarousel'

import gsap from 'gsap'
// import {useGSAP} from '@gsap/react'
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { div } from 'framer-motion/client';

gsap.registerPlugin(ScrollTrigger);

const Scroller = () => {


    useEffect(() => {
		gsap.to(".div2",{
            transform:"translateX(-100%)",
            scrollTrigger:{
                trigger:".scroller",
                scroller:"body",
                pin:true,
                markers:false,
                start:"top 50%",
                end:"top 100%",
                scrub:1
               
            
            }
        })
	}, []);
  return (
    <div>


            <div className='scroller'>


          


            {/* <VideoCarousel/> */}
            <div className='div2'></div>
            <div className='div2'></div>
            <div className='div2'></div>
            <div className='div2'></div>
            
            

            </div>

            <div className='div3'></div>
           
    </div>
    
  )
}

export default Scroller