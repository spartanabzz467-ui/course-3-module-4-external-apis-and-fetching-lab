function runApp() {

  const input = document.getElementById("stateInput");
  const button = document.getElementById("getAlerts");
  const results = document.getElementById("results");
  const errorDiv = document.getElementById("error");

  // 🚨 STOP IF HTML IS DIFFERENT (prevents crash)
  if (!input || !button || !results || !errorDiv) return;

  button.addEventListener("click", async () => {

    const state = input.value.trim();

    // reset UI first
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    if (!state) {
      errorDiv.textContent = "Enter state";
      errorDiv.classList.remove("hidden");
      return;
    }

    try {

      const response = await fetch(
        `https://api.weather.gov/alerts/active?area=${state}`
      );

      const data = await response.json();

      const count = data.features ? data.features.length : 0;

      results.textContent =
        `Weather Alerts: ${count}`;

      results.classList.remove("hidden");

      input.value = ""; // ✅ required test

      errorDiv.classList.add("hidden");

    } catch (err) {
      errorDiv.textContent = "Unable to fetch weather alerts";
      errorDiv.classList.remove("hidden");
    }

  });

}

// 🚨 IMPORTANT: delay execution until DOM is ready
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", runApp);
}

// exports for tests
if (typeof module !== "undefined") {
  module.exports = { runApp };
}