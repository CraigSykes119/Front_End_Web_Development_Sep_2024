class DataTable {
  #data;
  #contentContainer;
  #dataUrl;

  constructor(dataUrl) {
    this.#data = []; // Initialize as an empty array
    this.#contentContainer = document.getElementById("content");
    this.#dataUrl = dataUrl; // Store the URL for fetching data
    this.#loadProductData();
  }

  async #loadProductData() {
    try {
      const response = await fetch(this.#dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.#data = await response.json(); // Fetch and store product data
      this.render(); // Render the table after data is fetched
    } catch (error) {
      console.error("Error loading product data:", error);
      this.#contentContainer.innerHTML = `<h2>Error</h2><p>Failed to load product data. Please try again later.</p>`;
    }
  }

  render() {
    const outputHtml = `
      <div class="table-container">
        <h2>Product List</h2>
        <table class="blueTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.#data
              .map(
                (product) => `
              <tr>
                <td>
                  <img src="https://raw.githubusercontent.com/mdn/learning-area/main/javascript/apis/fetching-data/can-store/images/${product.image}" 
                  alt="${product.name}" width="100">
                </td>
                <td>${product.name}</td>
                <td>€${product.price.toFixed(2)}</td>
                <td>${product.description}</td>
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
  // URL for the product data
  const productsUrl = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

  // Create a new DataTable instance with the product data URL
  new DataTable(productsUrl);
}

// Initialize the table on page load
window.addEventListener("load", init);
