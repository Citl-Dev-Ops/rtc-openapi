document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <main style="font-family: sans-serif; padding: 2rem;">
        <h1>🎓 RTC GPT Interface</h1>
        <p>This app is live on GitHub Pages and will be enhanced step-by-step.</p>
      </main>
    `;
  } else {
    console.error("❌ Could not find #root element.");
  }
});
