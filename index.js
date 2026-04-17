document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#state-input");
  const button = document.querySelector("#get-alerts-btn");

  const alertsDisplay = document.querySelector("#alerts-display");
  const errorDiv = document.querySelector("#error-message");

  async function fetchWeatherData(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;
    return fetch(url);
  }

  function displayWeather(data) {
    const count = data.features ? data.features.length : 0;

    alertsDisplay.classList.remove("hidden");
    errorDiv.classList.add("hidden");

    alertsDisplay.textContent = `Weather Alerts: ${count}`;

    if (data.features && data.features.length > 0) {
      data.features.forEach((alert) => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline || "No headline";
        alertsDisplay.appendChild(p);
      });
    }
  }

  function displayError(message) {
    errorDiv.classList.remove("hidden");
    alertsDisplay.classList.add("hidden");

    errorDiv.textContent = message;
  }

  button.addEventListener("click", async () => {
    const state = input.value.trim();

    if (!state) {
      displayError("Please enter a state abbreviation");
      return;
    }

    try {
      const response = await fetchWeatherData(state);
      const data = await response.json();

      displayWeather(data);

      input.value = "";
    } catch (err) {
      displayError("Network issue");
      input.value = "";
    }
  });
});