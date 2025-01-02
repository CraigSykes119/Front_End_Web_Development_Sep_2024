// Function to calculate the sum of first N odd integers
const sumOddIntegers = (n) => {
    let sum = 0;
    let oddNum = 1;  // Starting with the first odd number
  
    // Loop through the first N odd integers
    for (let i = 0; i < n; i++) {
      sum += oddNum;
      oddNum += 2;  // Move to the next odd number
    }
  
    console.log(`Sum of first ${n} odd integers: ${sum}`);
  };
  
  // Example: Calculate the sum of the first 4 odd integers
  sumOddIntegers(4); // Expected output: 1 + 3 + 5 + 7 = 16
  