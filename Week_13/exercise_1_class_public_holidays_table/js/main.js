class PublicHolidaysDataTable {
  // properties
  #dataUrl = "https://date.nager.at/api/v3/PublicHolidays/"; // base URL to REST API
  #country = "IE"; // default country
  #year = "2024"; // default year
  #title = "Public Holidays"; // default title
  #data = []; // data object returned via fetch()
  #componentRoot; // DOM node for component

  constructor(componentId) {
    this.#componentRoot = document.getElementById(componentId);
    if (!this.#componentRoot) {
      console.error("Component root not found. Check the HTML element ID.");
      return;
    }
    this.#addEventListeners();
    this.#loadData();
  }

  async #loadData() {
    try {
      const response = await fetch(`${this.#dataUrl}${this.#year}/${this.#country}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.#data = await response.json(); // Fetch and store public holiday data
      this.render(); // Render the table after data is fetched
    } catch (error) {
      console.error("Error loading data:", error);
      this.#componentRoot.innerHTML = `<h2>Error</h2><p>Failed to load data. Please try again later.</p>`;
    }
  }

  render() {
    // Dropdown controls
    const dropdownsHtml = `
      <div class="dropdown-controls">
        <label for="country-select">Country:</label>
        <select id="country-select" name="country">
          <option value="IE" ${this.#country === "IE" ? "selected" : ""}>Ireland</option>
          <option value="FR" ${this.#country === "FR" ? "selected" : ""}>France</option>
          <option value="ES" ${this.#country === "ES" ? "selected" : ""}>Spain</option>
        </select>

        <label for="year-select">Year:</label>
        <select id="year-select" name="year">
          <option value="2024" ${this.#year === "2024" ? "selected" : ""}>2024</option>
          <option value="2025" ${this.#year === "2025" ? "selected" : ""}>2025</option>
          <option value="2026" ${this.#year === "2026" ? "selected" : ""}>2026</option>
        </select>
      </div>
    `;

    // Generate table HTML
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

    // Render everything
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
    this.#loadData(); // Reload data when dropdowns change
  }

  #addEventListeners() {
    this.#componentRoot.addEventListener("change", (event) => this.handleEvent(event));
  }

  #capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function init() {
  // Ensure the component root exists
  const holidaysContainer = document.getElementById("holidays-container");
  if (!holidaysContainer) {
    console.error("Holidays container not found.");
    return;
  }

  // Create an instance of PublicHolidaysDataTable
  new PublicHolidaysDataTable("holidays-container");
}

// Initialize the app on page load
window.addEventListener("load", init);
