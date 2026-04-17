const input = document.getElementById("stateInput");
const button = document.getElementById("getAlerts");
const results = document.getElementById("results");
const errorDiv = document.getElementById("error");

// CLICK EVENT (MUST WORK OR TESTS FAIL)
button.addEventListener("click", async () => {

  const state = input.value.trim();

  // ALWAYS CLEAR ERROR FIRST (REQUIRED TEST)
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  if (!state) {
    errorDiv.textContent = "Please enter a state";
    errorDiv.classList.remove("hidden");
    return;
  }

  try {

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    const data = await response.json();

    const count = data.features ? data.features.length : 0;

    // REQUIRED FORMAT (TEST EXPECTS THIS STYLE)
    results.textContent =
      `Weather Alerts: ${count}`;

    // CLEAR INPUT (TEST REQUIREMENT)
    input.value = "";

    // SHOW RESULTS, HIDE ERROR
    results.classList.remove("hidden");
    errorDiv.classList.add("hidden");

  } catch (err) {

    errorDiv.textContent = "Unable to fetch weather alerts";
    errorDiv.classList.remove("hidden");

  }

});

// EXPORT FOR TESTS
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherData: async (state) => {
      return fetch(`https://api.weather.gov/alerts/active?area=${state}`);
    }
  };
}