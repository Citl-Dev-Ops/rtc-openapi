import React, { useState } from 'react';

export default function TermInput({ onTermCode }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/term/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term_text: input })
    });
    const data = await res.json();
    onTermCode(data.term_code);  // Pass code back up
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="termInput">Enter Term (e.g., "Spring 2025")</label>
      <input
        id="termInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type quarter name or season"
      />
      <button type="submit">Search</button>
    </form>
  );
}
