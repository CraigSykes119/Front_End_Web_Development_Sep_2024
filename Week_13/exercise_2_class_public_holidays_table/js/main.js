class PublicHolidaysDataTable {
  // properties
  #dataUrl = "https://date.nager.at/api/v3/PublicHolidays/";
  #countriesUrl = "https://date.nager.at/api/v3/AvailableCountries"; // URL to fetch available countries
  #country = "IE"; // default country
  #year = "2024"; // default year
  #title = "Public Holidays"; // default title
  #data = []; // data object returned via fetch()
  #componentRoot; // DOM node for component
  #dropdownCountries = []; // List of countries
  #dropdownYears = []; // List of years

  constructor(componentId) {
    this.#componentRoot = document.getElementById(componentId);
    if (!this.#componentRoot) {
      console.error("Component root not found. Check the HTML element ID.");
      return;
    }
    this.#init(); // Initialize the component
  }

  async #init() {
    await this.#loadCountries();
    this.#loadYears();
    await this.#loadData();
    this.render();
    this.#addEventListeners();
  }

  async #loadData() {
    try {
      const response = await fetch(`${this.#dataUrl}${this.#year}/${this.#country}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.#data = await response.json();
    } catch (error) {
      console.error("Error loading data:", error);
      this.#data = [];
    }
  }

  async #loadCountries() {
    try {
      const response = await fetch(this.#countriesUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.#dropdownCountries = await response.json(); // Fetch the list of countries
    } catch (error) {
      console.error("Error loading countries:", error);
      this.#dropdownCountries = [];
    }
  }

  #loadYears() {
    const currentYear = new Date().getFullYear();
    this.#dropdownYears = Array.from({ length: 10 }, (_, i) => currentYear + i);
  }

  #renderCountries() {
    return this.#dropdownCountries
      .map(
        (country) =>
          `<option value="${country.countryCode}" ${
            this.#country === country.countryCode ? "selected" : ""
          }>${country.name}</option>`
      )
      .join("");
  }

  #renderYears() {
    return this.#dropdownYears
      .map(
        (year) =>
          `<option value="${year}" ${this.#year === String(year) ? "selected" : ""}>${year}</option>`
      )
      .join("");
  }

  render() {
    const dropdownsHtml = `
      <div class="dropdown-controls">
        <label for="country-select">Country:</label>
        <select id="country-select" name="country">
          ${this.#renderCountries()}
        </select>

        <label for="year-select">Year:</label>
        <select id="year-select" name="year">
          ${this.#renderYears()}
        </select>
      </div>
    `;

    const tableHtml = this.#data.length
      ? `
      <table class="blueTable">
        <thead>
          <tr>
            ${Object.getOwnPropertyNames(this.#data[0])
              .map((name) => `<th>${this.#capitalize(name)}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${this.#data
            .map(
              (holiday) => `
            <tr>
              ${Object.getOwnPropertyNames(holiday)
                .map((property) => `<td>${holiday[property]}</td>`)
                .join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `
      : `<p>No data available.</p>`;

    this.#componentRoot.innerHTML = `
      <div class="public-holidays-component">
        <h2>${this.#title}</h2>
        ${dropdownsHtml}
        ${tableHtml}
      </div>
    `;
  }

  handleEvent(event) {
    const { name, value } = event.target;
    if (name === "country") {
      this.#country = value;
    } else if (name === "year") {
      this.#year = value;
    }
    this.#loadData().then(() => this.render());
  }

  #addEventListeners() {
    this.#componentRoot.addEventListener("change", (event) => this.handleEvent(event));
  }

  #capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function init() {
  // Create an instance of PublicHolidaysDataTable
  new PublicHolidaysDataTable("holidays-container");
}

// Initialize the app on page load
window.addEventListener("load", init);
