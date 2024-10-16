// Function to multiply all numbers in an array
function multiplyArray(numbers) {
    // Initialize product to 1 (since multiplying by 1 doesn't change the result)
    let product = 1;

    // Loop through the array and multiply each element
    for (let i = 0; i < numbers.length; i++) {
        product *= numbers[i];
    }

    return product; // Return the final product
}

// Test the function with a sample array
const numbersArray = [2, 3, 4, 5];

// Get the product of the array
const result = multiplyArray(numbersArray);

// Display the result on the webpage
document.getElementById("result").textContent = "The product of the array is: " + result;