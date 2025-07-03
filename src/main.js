import './index.css';

const root = document.getElementById('root');

const app = document.createElement('div');
app.className = 'p-4 max-w-lg mx-auto';

const form = document.createElement('form');
form.innerHTML = `
  <input type="text" placeholder="Enter Term (e.g. 2253)" id="term" class="border p-2 rounded w-full mb-2" />
  <input type="text" placeholder="Enter Subject (optional)" id="subject" class="border p-2 rounded w-full mb-2" />
  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Fetch Classes</button>
`;
app.appendChild(form);

const resultDiv = document.createElement('div');
app.appendChild(resultDiv);

root.appendChild(app);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const term = document.getElementById('term').value;
  const subject = document.getElementById('subject').value;

  try {
    const response = await fetch('https://classes.sbctc.edu/fetchSchedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term, subject })
    });
    const data = await response.json();
    resultDiv.innerHTML = `<pre class="bg-gray-100 p-2 rounded">${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    resultDiv.textContent = 'Error fetching data: ' + err.message;
  }
});
