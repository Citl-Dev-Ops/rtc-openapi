import React, { useState } from 'react';

export default function App() {
  const [term, setTerm] = useState('');
  const [subject, setSubject] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const response = await fetch('/api/fetchSchedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term, subject })
      });
      if (!response.ok) {
        throw new Error('API error');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">RTC Class Advisor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Term (e.g. 2253)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Enter Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Fetch Classes
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <pre className="bg-gray-100 p-2 rounded mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
