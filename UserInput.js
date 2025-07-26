import React from 'react';
import { useChat } from '../context/ChatContext';

const UserInput = () => {
  const { inputValue, setInputValue, addMessage, setLoading, saveConversation } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage({ sender: 'user', text: inputValue });
    setLoading(true);

    try {
      // Simulate API call or backend interaction here
      // For now, just echo the user input as AI response after delay
      const userInput = inputValue;
      setInputValue('');

      setTimeout(() => {
        addMessage({ sender: 'ai', text: `You said: ${userInput}` });
        setLoading(false);
        saveConversation();
      }, 1000);
    } catch (error) {
      addMessage({ sender: 'ai', text: 'Error processing your message.' });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', padding: 10, borderTop: '1px solid #ccc' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, padding: 10, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ marginLeft: 10, padding: '10px 20px', fontSize: 16 }}>
        Send
      </button>
    </form>
  );
};

export default UserInput;
