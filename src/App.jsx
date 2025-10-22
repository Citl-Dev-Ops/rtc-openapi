import React, { useState } from 'react';
import TermInput from './components/TermInput';

function App() {
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchClasses = async ({ term, subject }) => {
    setErrorMsg('');
    setResults([]);

    try {
      const response = await fetch('/api/fetchSchedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term, subject })
      });

      if (!response.ok) {
        const t = await response.text();
        throw new Error(`Fetch failed (${response.status}): ${t}`);
      }

      const data = await response.json();
      setResults(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error fetching data. Please try another term/subject.');
    }
  };

  return (
    <div>
      <h1>RTC Class Schedule</h1>
      <TermInput onSearch={fetchClasses} />
      {errorMsg && <p style={{color:'crimson'}}>{errorMsg}</p>}
      <ul>
        {results.map((course, idx) => (
          <li key={idx}>
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
