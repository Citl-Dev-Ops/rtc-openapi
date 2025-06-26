const root = document.getElementById("root");

root.innerHTML = `
  <h2>Select a Term and Subject</h2>
  <select id="term">
    <option value="1253">Summer 2025 (1253)</option>
    <option value="1255">Fall 2025 (1255)</option>
  </select>
  <input id="subject" placeholder="e.g., CNE" />
  <button onclick="fetchData()">Fetch Classes</button>
  <pre id="results" style="margin-top: 1em; background: #eee; padding: 1em;"></pre>
`;

window.fetchData = async () => {
  const term = document.getElementById("term").value;
  const subject = document.getElementById("subject").value;
  const results = document.getElementById("results");

  results.textContent = "Loading...";

  try {
    const res = await fetch("https://ctclink-schedule-proxy.onrender.com/api/fetchSchedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term, subject })
    });

    const data = await res.json();

    if (!data.data?.length) {
      results.textContent = "No results found.";
      return;
    }

    results.textContent = JSON.stringify(data.data, null, 2);
  } catch (err) {
    results.textContent = "Error: " + err.message;
  }
};
