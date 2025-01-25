class DataTable {
    #data;
    #contentContainer;
  
    constructor(data) {
      this.#data = data;
      this.#contentContainer = document.getElementById("content");
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
                  <td>${holiday.types.join(", ")}</td>
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
    try {
      // Create a new DataTable instance
      const dataTable = new DataTable(data);
  
      // Render the table
      dataTable.render();
    } catch (err) {
      console.error(err);
      const contentContainer = document.getElementById("content");
      contentContainer.innerHTML = `<h2>Error</h2><p>No public holidays to display.</p><p>${err}</p>`;
    }
  }
  
  // Initialize the table on page load
  window.addEventListener("load", init);
  