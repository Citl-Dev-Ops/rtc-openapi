import React, { useState } from 'react';
import TermInput from './components/TermInput';

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchClasses = async ({ term, subject }) => {
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ term, subject })
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Server responded with error: ${msg}`);
      }

      const data = await response.json();
      setResults(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError("Network error or invalid response from server.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>RTC Class Schedule</h1>
      <TermInput onSearch={fetchClasses} />

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          ⚠ {error}
        </p>
      )}

      <ul style={{ marginTop: "1.5rem" }}>
        {results.map((course, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <strong>{course.subject} {course.catalogNbr} – {course.courseTitle}</strong><br />
            Instructor: {course.instructor}<br />
            {course.units} units | {course.instructionMode}<br />
            {course.startDate} to {course.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
