import React, { useState } from 'react';

export default function TermInput({ onSubmit }) {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/term/convert', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ term_text: userInput })
    });
    const { term_code } = await response.json();
    onSubmit(term_code);  // Pass correct code to your search function
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Term (e.g., "Spring 2025")</label>
      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}
