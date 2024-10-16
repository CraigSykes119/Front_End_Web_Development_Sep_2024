function sumOddIntegers(N) {
    let sum = 0;
    let oddNumber = 1;

    // Loop through the first N odd integers
    for (let i = 0; i < N; i++) {
        sum += oddNumber;
        oddNumber += 2;  // Move to the next odd number
    }

    // Print the result to the console
    console.log("The sum of the first " + N + " odd integers is: " + sum);
}

// Hardcoded input
const N = 4;
sumOddIntegers(N);