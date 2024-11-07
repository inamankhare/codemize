import React from 'react';
import Avatar from 'react-avatar';
import './Client.css';

const Client = ({ username }) => {
  return (
    <div className='clientMain'>
      <Avatar name={username.toString()} size={50} round="15px" />
      <span className='clientspan'> {username.toString()}</span>
    </div>
  );
};

export default Client;