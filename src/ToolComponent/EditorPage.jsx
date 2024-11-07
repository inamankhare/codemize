import React, { useEffect, useRef, useState } from 'react';
import './EditorPage.css';
import logo from '../Assets/codemize.png';
import NavBar from '../Components/NavBar';
import Client from './Client';
import Editor from './Editor';
import { initSocket } from '../socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const [clients, setClients] = useState([]);
  const editorInstanceRef = useRef(null);
  const codeRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);

  const errorHandler = (err) => {
    toast.error("Error occurred while connecting to the server. Please try again.");
  };

  useEffect(() => {
    const init = async () => {
      try {
        const socket = await initSocket();
        socketRef.current = socket;
        setIsSocketInitialized(true);

        if (socketRef.current) {
          socketRef.current.on('connection_error', (err) => errorHandler(err));
          socketRef.current.on('connection_failed_error', (err) => errorHandler(err));
          socketRef.current.on('join', ({ clients, username, socketId }) => {
            if (username !== location.state?.username) {
              toast.success(`${username} joined`);
            }
            setClients(clients);
          });
          socketRef.current.on('disconnected', ({ socketId, username }) => {
            toast.success(`${username} left`);
            setClients((prev) => prev.filter((client) => client.socketId !== socketId));
          });
          socketRef.current.on('newUserJoined', ({ username, clients, socketId }) => {
            toast.success(`${username} joined`);
            setClients(clients);
          });
          socketRef.current.on('code-update', (data) => {
            if (editorInstanceRef.current && data.roomId === roomId) {
              editorInstanceRef.current.setValue(data.code);
            }
          });

          socketRef.current.emit('join', { roomId, username: location.state?.username });
        }
      } catch (err) {
        console.error('Socket initialization failed:', err);
        toast.error('Socket initialization failed');
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off('connection_error');
        socketRef.current.off('connection_failed_error');
        socketRef.current.off('join');
        socketRef.current.off('disconnected');
        socketRef.current.off('newUserJoined');
        socketRef.current.off('code-update');
      }
    };
  }, []);

  return (
    <div className='main'>
      {/* <NavBar/> */}
      <div className="wrapper">
        <div className="side">
          <div className='logo'>
            <img src={logo} alt="Codemize logo" />
          </div>
          <div className="line"></div>
          <p className='side-mem'>Members</p>
          <div className="clients">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="btmbtn">
          <button className="copyridbtn">Copy room id</button>
          <button className='leaveroombtn'>Leave room</button>
        </div>
        <div className="editor">
          {isSocketInitialized && (
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              onCodeChange={(code) => {
                codeRef.current = code;
              }}
            />
          )}
        </div>
        <div className="output-container">
          {/* <h3>Output:</h3> */}
          <pre>{/* Output will be displayed here */}</pre>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
