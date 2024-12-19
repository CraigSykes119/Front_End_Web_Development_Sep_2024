import { PublicHolidaysDataTable } from "./modules/class-public-holidays-data-table.js";

function createPublicHolidayDataTable(country, year) {
    let holidaysDataTable = null;

    if (!country) {
        country = "IE";
    }
    if (!year) {
        year = 2024;
    }

    try {
        // build table using an instance of DataTable class
        holidaysDataTable = new PublicHolidaysDataTable(
            {   title: "List of Public Holidays",
                country: country,
                year: year,
                columnNames: ['date', 'localName', 'name', 'types'],
            });
    } catch(err) {
        console.error(err);
        holidaysDataTable.getComponentRoot().innerHTML += '<h2>Error</h2><p>No product data to display.</p><p>' + err + '</p>';
    }
    return holidaysDataTable; 
}

function init() {
    let holidaysDataTable = null;

    const phModalEl = document.getElementById('publicHolidayModal')
    phModalEl.addEventListener('show.bs.modal', event => {
        console.log("publicHolidayModal has been clicked");
        console.log(event.relatedTarget.dataset);

        const country = event.relatedTarget.dataset.phCountry;
        const year = event.relatedTarget.dataset.phYear;
        holidaysDataTable = createPublicHolidayDataTable(country, year)
    });

}

window.addEventListener("load", (event => {
    init();
}));

