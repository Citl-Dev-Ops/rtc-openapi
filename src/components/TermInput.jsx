import React, { useState } from 'react';

export default function TermInput({ onSearch }) {
  const [termText, setTermText] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert natural language to term code
    const convertRes = await fetch('/api/term/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term_text: termText })
    });

    const convertData = await convertRes.json();
    const termCode = convertData.term_code;

    if (!termCode || termCode === "UNKNOWN") {
      alert("Sorry, we couldn't determine the academic term. Try 'Spring 2025' or 'next quarter'.");
      return;
    }

    // Pass full query to parent (App.jsx or wherever logic runs)
    onSearch({ term: termCode, subject });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter Term (e.g. Spring 2025 or next quarter)"
        value={termText}
        onChange={(e) => setTermText(e.target.value)}
      />
      <input
        placeholder="Enter Subject (optional)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button type="submit">Fetch Classes</button>
    </form>
  );
}
