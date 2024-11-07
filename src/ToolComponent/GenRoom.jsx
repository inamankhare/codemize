import React, { useState } from 'react'
import './GenRoom.css'
import logo from '../Assets/codemize.png'
import NavBar from '../Components/NavBar'
import { Link } from 'react-router-dom'
import {v4 as uuid} from "uuid";
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Footer from '../Components/Footer'

const GenRoom = () => {

    const[roomid,setRoomid] = useState("");
    const[username,setUsername]=useState("")
    const navigate = useNavigate();



    const generateRoomidHandler = (e)=>{
        e.preventDefault();
        const id = uuid();
        setRoomid(id);
        toast.success("RoomId Generated")
    }

    const joinRoomHandler = () =>{
        if(!roomid || !username){
            toast.error("Both  RoomId and Username are required")
            navigate(`/codemize-tool-genRoom`)
            return;
        }
        navigate(`/codemize-tool-code-editor/${roomid}`,{
            state:{username},
        } );

        toast.success("Room created successfully!")
  
    }
  return (
    <div className='Wrapper'>

        <NavBar/>

        <div className="Room-Form">

        <div className='logo'>
            <img src={logo} alt="Codemize logo" />
        </div>

        <div className='mainline'></div>
            <h3 className='jointext'>Join a code room</h3>

            <div className="inputs-fields">
                <input type="text" 
                placeholder='Room id'
                value={roomid}
                onChange={(e)=>setRoomid(e.target.value)}
                />
                <input type="text" placeholder='Username'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />

            </div>

            <button className='Joinbtn' onClick={joinRoomHandler} >
               <Link className="btnlink" to="/codemize-tool-code-editor/:roomid"> Join</Link> 
            </button>

            <div className='btmtext'>

                <p className='btmpara'>Don't have a room id?  </p> <span className='New-Room' onClick={generateRoomidHandler}> New Room</span>


            </div>
           
      
         
        </div>

   
     <div className="footer">
     <Footer/>
     </div>
    </div>
  )
}

export default GenRoom