import React, { useState } from 'react';
import TermInput from './components/TermInput';

function App() {
  const [results, setResults] = useState([]);

  const fetchClasses = async ({ term, subject }) => {
    const response = await fetch('https://classes.sbctc.edu/api/Schedule/Search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ term, subject })
    });

    if (!response.ok) {
      alert("Failed to fetch classes. Check the term or subject.");
      return;
    }

    const data = await response.json();
    setResults(data.data || []);
  };

  return (
    <div>
      <h1>RTC Class Schedule</h1>
      <TermInput onSearch={fetchClasses} />
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
