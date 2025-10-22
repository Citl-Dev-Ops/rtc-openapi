import React, { useState } from 'react';

// Minimal season->term code helper for demo (adjust as you like)
function toTermCode(input) {
  const text = (input || '').trim().toLowerCase();
  const now = new Date();
  const year2 = String(now.getFullYear()).slice(-2);

  const map = { winter: '51', spring: '53', summer: '54', fall: '55' };
  if (map[text]) return `${year2}${map[text]}`;

  // already numeric like 2254
  if (/^\d{4}$/.test(text)) return text;

  return ''; // let backend/UX handle empty
}

export default function TermInput({ onSearch }) {
  const [termText, setTermText] = useState('');
  const [subject, setSubject] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const term = toTermCode(termText);
    onSearch({ term, subject });
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Type: Fall, Winter, Spring, Summer or 4-digit code (e.g., 2254)"
        value={termText}
        onChange={e => setTermText(e.target.value)}
      />
      <input
        placeholder="Enter Subject (optional, e.g., ENGL)"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <button type="submit">Fetch Classes</button>
    </form>
  );
}
