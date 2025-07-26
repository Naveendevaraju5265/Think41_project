import React from 'react';
import Message from './Message';

const MessageList = ({ messages, loading }) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 10, backgroundColor: '#f9f9f9' }}>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
      {loading && <div style={{ textAlign: 'center', marginTop: 10 }}>Loading...</div>}
    </div>
  );
};

export default MessageList;
