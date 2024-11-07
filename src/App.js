
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Contact from './Components/Contact';
import More from './Components/More';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import About from './Components/About';
import GenRoom from './ToolComponent/GenRoom';
import EditorPage from './ToolComponent/EditorPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster position='top-center'></Toaster>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element = { <Contact/>}/>
        <Route path="/more" element = { <More/>}/>
        <Route path="/codemize-tool-genRoom" element = { <GenRoom/>}/>
        <Route path="/codemize-tool-code-editor/:roomid" element = { <EditorPage/>}/>
        {/* <Route path='/*' element= { <NotFound/>}/> */}
        

      </Routes>
   
     
    
    </>
  );
}

export default App;
