function factorial() {
    // Declare variables
    let number = 0;
    let factorial = 1;
    let output = "";

    // Input: Prompt user for a number between 1 and 20
    number = parseInt(prompt("Enter a number between 1 and 20"));
    while (isNaN(number) || number <= 1 || number >= 20) {
        number = parseInt(prompt("Please enter a valid number between 1 and 20"));
    }

    // Calculate factorials
    output = "Factorials up to " + number + ": ";
    for (let j = number; j >= 1; j--) {  // Outer loop
        output += j + '! = ' + fac(j) + ', ';
    }

    // Output the final result
    alert(output);
}

// Factorial function using an arrow function
const fac = (num) => {
    let fac = 1;
    for (let i = 1; i <= num; i++) {
        fac *= i;
    }
    return fac;
}

factorial();