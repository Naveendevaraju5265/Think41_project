import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationHistory from './ConversationHistory';
import { useChat } from '../context/ChatContext';

const ChatWindow = () => {
  const { messages, loading, conversations, loadConversation } = useChat();

  return (
    <div style={{ display: 'flex', height: '80vh', maxWidth: 900, margin: 'auto', border: '1px solid #ccc', borderRadius: 8 }}>
      <div style={{ width: '25%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h3 style={{ textAlign: 'center' }}>Conversations</h3>
        <ConversationHistory conversations={conversations} onSelect={loadConversation} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MessageList messages={messages} loading={loading} />
        <UserInput />
      </div>
    </div>
  );
};

export default ChatWindow;
