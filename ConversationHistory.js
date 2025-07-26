import React from 'react';

const ConversationHistory = ({ conversations, onSelect }) => {
  return (
    <div>
      {conversations.length === 0 && <p style={{ textAlign: 'center' }}>No conversations yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {conversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            Conversation {conv.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationHistory;
