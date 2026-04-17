// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!const input = document.getElementById("stateInput");
const button = document.getElementById("getAlerts");
const results = document.getElementById("results");
const errorDiv = document.getElementById("error");

// FETCH WEATHER DATA
async function fetchWeatherData(state) {
  try {

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }

    const data = await response.json();

    displayWeather(data, state);

    return data;

  } catch (err) {
    displayError("Unable to fetch weather alerts");
  }
}

// DISPLAY WEATHER
function displayWeather(data, state) {

  const count = data.features.length;

  results.textContent =
    `Current watches, warnings, and advisories for ${state.toUpperCase()}: ${count}`;

  // clear error on success (IMPORTANT TEST REQUIREMENT)
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
}

// DISPLAY ERROR
function displayError(message) {

  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

// BUTTON CLICK EVENT
button.addEventListener("click", () => {

  const state = input.value.trim();

  if (!state) {
    displayError("Please enter a state abbreviation");
    return;
  }

  fetchWeatherData(state);

  // clear input after click (TEST REQUIREMENT)
  input.value = "";
});

// EXPORT FOR TESTING (IMPORTANT FOR CODEGRADE)
if (typeof module !== "undefined") {
  module.exports = {
    fetchWeatherData,
    displayWeather,
    displayError
  };
}