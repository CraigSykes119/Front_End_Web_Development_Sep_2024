// Prompt user for a number
let num = parseInt(prompt("Enter a number of stars:"));

// Check if the input is a valid, non-negative number
if (!isNaN(num) && num >= 0) {
    let stars = "*".repeat(num); // Create a string of stars
    console.log(stars); // Log to console
    document.getElementById('stars').textContent = stars; // Display on the web page
} else {
    alert("Please enter a valid, non-negative number.");
}
