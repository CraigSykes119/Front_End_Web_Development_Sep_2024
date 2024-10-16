function drawConsolePyramid(height) {
    let pyramidElement = document.getElementById("pyramid"); // Get the pyramid display element
    let pyramid = ''; // Initialize the pyramid string

    for (let i = 1; i <= height; i++) {
        // Calculate the number of stars for the current row
        let numStars = 2 * i - 1;

        // Calculate the number of spaces to center the stars
        let numSpaces = height - i;

        // Create the row by concatenating spaces and stars
        let row = ' '.repeat(numSpaces) + '*'.repeat(numStars);

        // Add the row to the pyramid string with a newline for the next row
        pyramid += row + '\n';
    }

    // Output the pyramid to the webpage by setting the text content of the element
    pyramidElement.textContent = pyramid;
}

// Call the function with height 8
drawConsolePyramid(8);