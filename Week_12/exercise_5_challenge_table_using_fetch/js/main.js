class DataTable {
  #data;
  #contentContainer;
  #dataUrl;

  constructor(dataUrl, containerId) {
    this.#data = []; // Initialize as an empty array
    this.#contentContainer = document.getElementById(containerId);
    this.#dataUrl = dataUrl; // Store the URL for fetching data
    this.#loadData();
  }

  async #loadData() {
    try {
      const response = await fetch(this.#dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.#data = await response.json(); // Fetch and store data
      this.render(); // Render the table after data is fetched
    } catch (error) {
      console.error("Error loading data:", error);
      this.#contentContainer.innerHTML = `<h2>Error</h2><p>Failed to load data. Please try again later.</p>`;
    }
  }

  render() {
    if (this.#data.length === 0) {
      this.#contentContainer.innerHTML = `<p>No data available to display.</p>`;
      return;
    }

    // Get property names from the first object in the dataset
    const propertyNames = Object.getOwnPropertyNames(this.#data[0]);

    // Generate the table HTML dynamically
    const outputHtml = `
      <div class="table-container">
        <h2>Data Table</h2>
        <table class="blueTable">
          <thead>
            <tr>
              ${propertyNames
                .map((property) => `<th>${this.#capitalize(property)}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${this.#data
              .map((item) => {
                return `
                  <tr>
                    ${propertyNames
                      .map((property) => {
                        // Special handling for "image" property in product data
                        if (property === "image") {
                          return `<td>${item[property]}</td>`;
                        }
                        return `<td>${item[property] || "N/A"}</td>`;
                      })
                      .join("")}
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    // Inject the generated HTML into the content container
    this.#contentContainer.innerHTML = outputHtml;
  }

  #capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function init() {
  // URLs for data sources
  const holidaysUrl = "https://date.nager.at/api/v3/PublicHolidays/2024/IE";
  const productsUrl =
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

  // Create DataTable instances for both URLs
  new DataTable(holidaysUrl, "holidays-container");
  new DataTable(productsUrl, "products-container");
}

// Initialize the tables on page load
window.addEventListener("load", init);
