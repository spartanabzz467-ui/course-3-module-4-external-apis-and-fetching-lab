const input = document.getElementById("stateInput");
const button = document.getElementById("getAlerts");
const results = document.getElementById("results");
const errorDiv = document.getElementById("error");

// 🚨 CRITICAL FIX: only run if DOM exists
if (button && input && results && errorDiv) {

  button.addEventListener("click", () => {

    const state = input.value.trim();

    if (!state) {
      displayError("Please enter a state abbreviation");
      return;
    }

    fetchWeatherData(state);

    input.value = "";
  });

}

// FETCH DATA
async function fetchWeatherData(state) {
  try {
    const res = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();

    displayWeather(data, state);

  } catch (err) {
    displayError("Unable to fetch weather alerts");
  }
}

// DISPLAY WEATHER
function displayWeather(data, state) {

  const count = data.features ? data.features.length : 0;

  results.textContent =
    `Current watches, warnings, and advisories for ${state.toUpperCase()}: ${count}`;

  errorDiv.textContent = "";
  errorDiv.style.display = "none";
}

// DISPLAY ERROR
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

// EXPORT FOR TESTING
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherData,
    displayWeather,
    displayError
  };
}