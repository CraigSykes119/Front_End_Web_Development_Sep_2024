// Function to calculate the average of n random numbers between 0 and 1
function randomAverage(n) {
    let sum = 0;

    // Generate n random numbers and sum them
    for (let i = 0; i < n; i++) {
        sum += Math.random();
    }

    // Return the average
    return sum / n;
}

// Main program to test randomAverage with different values of n
function displayResults() {
    const values = [1, 10, 100, 1000, 10000, 100000, 1000000];
    let resultsDiv = document.getElementById("results");

    // Loop through the values and calculate the average for each n
    values.forEach(n => {
        let avg = randomAverage(n);
        let resultText = "The average of " + n + " random values is: " + avg.toFixed(6);
        
        // Create a paragraph element to display each result
        let p = document.createElement("p");
        p.textContent = resultText;
        resultsDiv.appendChild(p);
    });
}

// Call the displayResults function when the page loads
displayResults();