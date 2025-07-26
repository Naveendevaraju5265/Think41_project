import React from 'react';

const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  const containerStyle = {
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    marginBottom: 10,
  };

  const messageStyle = {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: isUser ? '#007bff' : '#e5e5ea',
    color: isUser ? 'white' : 'black',
    wordWrap: 'break-word',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        {message.text}
      </div>
    </div>
  );
};

export default Message;
