import { PublicHolidaysDataTable } from "./modules/PublicHolidaysDataTable.js";

function init() {
  const config = {
    dataUrl: "https://date.nager.at/api/v3/PublicHolidays/",
    countriesUrl: "https://date.nager.at/api/v3/AvailableCountries",
    country: "IE",
    year: "2024",
    title: "Public Holidays",
    componentId: "holidays-container",
  };

  // Create an instance of PublicHolidaysDataTable with config
  new PublicHolidaysDataTable(config);
}

// Initialize the app on page load
window.addEventListener("load", init);
