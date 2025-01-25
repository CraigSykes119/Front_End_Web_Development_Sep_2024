class DataTable {
  #data;
  #contentContainer;

  constructor() {
    this.#data = []; // Initialize as empty array
    this.#contentContainer = document.getElementById("content");
    this.#loadHolidayData();
  }

  async #loadHolidayData() {
    try {
      const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2024/IE");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.#data = await response.json(); // Store fetched data
      this.render(); // Render table after data is fetched
    } catch (error) {
      console.error("Error loading holiday data:", error);
      this.#contentContainer.innerHTML = `<h2>Error</h2><p>Failed to load holiday data. Please try again later.</p>`;
    }
  }

  render() {
    const outputHtml = `
      <div class="table-container">
        <h2>List of Public Holidays in Ireland for 2024</h2>
        <table class="blueTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name (in Irish)</th>
              <th>Name</th>
              <th>Country Code</th>
              <th>Types</th>
            </tr>
          </thead>
          <tbody>
            ${this.#data
              .map(
                (holiday) => `
              <tr>
                <td>${holiday.date}</td>
                <td>${holiday.localName}</td>
                <td>${holiday.name}</td>
                <td>${holiday.countryCode}</td>
                <td>${holiday.types ? holiday.types.join(", ") : "N/A"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    // Inject the generated HTML into the content container
    this.#contentContainer.innerHTML = outputHtml;
  }
}

function init() {
  // Create a new DataTable instance
  new DataTable();
}

// Initialize the table on page load
window.addEventListener("load", init);
