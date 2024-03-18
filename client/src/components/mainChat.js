import React, { useEffect } from 'react'
import { chatStore } from '../zustandStores/chatRoom'
import Chat from './chat';
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const socket = io.connect("http://localhost:5000");

function MainChat() {

  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token1') && !localStorage.getItem('token2')){
      navigate('/login');
    }
  }, [])

  const username = chatStore((state) => state.username);
  const room = chatStore((state) => state.room);
  const showChat = chatStore((state) => state.showChat);
  const setShowChat = chatStore((state) => state.setShowChat);
  const setRoom = chatStore((state) => state.setRoom);
  const setUsername = chatStore((state) => state.setUsername);
  // const socket=props.socket;

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default MainChat
