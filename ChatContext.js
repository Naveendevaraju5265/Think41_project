import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const loadConversation = (conversationId) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      setMessages(conversation.messages);
      setActiveConversationId(conversationId);
    }
  };

  const saveConversation = () => {
    if (activeConversationId) {
      setConversations((prevConversations) =>
        prevConversations.map((c) =>
          c.id === activeConversationId ? { ...c, messages } : c
        )
      );
    } else {
      const newConversation = {
        id: Date.now(),
        messages,
      };
      setConversations((prevConversations) => [...prevConversations, newConversation]);
      setActiveConversationId(newConversation.id);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        loading,
        setLoading,
        inputValue,
        setInputValue,
        addMessage,
        conversations,
        loadConversation,
        saveConversation,
        activeConversationId,
        setActiveConversationId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
