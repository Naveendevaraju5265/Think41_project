import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = '';
    if (query.toLowerCase().includes('top 5 most sold products')) {
      apiUrl = 'http://localhost:5000/top-products';
    } else if (query.toLowerCase().includes('status of order id')) {
      const orderId = query.match(/order id (\d+)/i);
      if (orderId) {
        apiUrl = `http://localhost:5000/order-status/${orderId[1]}`;
      }
    } else if (query.toLowerCase().includes('how many') && query.toLowerCase().includes('left in stock')) {
      const productNameMatch = query.match(/how many (.+) are left in stock/i);
      if (productNameMatch) {
        const productName = productNameMatch[1];
        apiUrl = `http://localhost:5000/stock-count/${encodeURIComponent(productName)}`;
      }
    } else {
      setResponse('Sorry, I cannot answer that question.');
      return;
    }

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (res.ok) {
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setResponse(data.error || 'Error fetching data');
      }
    } catch (error) {
      setResponse('Error connecting to backend');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Customer Support Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question here"
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
          Ask
        </button>
      </form>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{response}</pre>
    </div>
  );
}

export default App;
