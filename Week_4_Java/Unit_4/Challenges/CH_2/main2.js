// Function to draw a pyramid of a given height
const drawConsolePyramid = (height) => {
    for (let i = 1; i <= height; i++) {
      // Centering the pyramid by adjusting spaces and asterisks
      let spaces = " ".repeat(height - i);      // Spaces on the left
      let stars = "*".repeat(2 * i - 1);        // Stars in the current row
  
      console.log(spaces + stars);               // Output the current row
    }
  };
  
  // Example: Draw a pyramid of height 8
  drawConsolePyramid(8); // This will draw an 8-level pyramid in the console
  