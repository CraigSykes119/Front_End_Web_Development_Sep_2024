let numbers = [];
let sum = 0;

// Get 5 numbers from the user
for (let i = 0; i < 5; i++) {
    let num = parseFloat(prompt(`Enter number ${i + 1}:`));
    numbers.push(num);
    sum += num;
}

let average = sum / numbers.length;

// Output to console
console.log(`Sum: ${sum}, Average: ${average.toFixed(3)}`);

// Display in the DOM
document.getElementById('result').innerHTML = `
    <p>Sum: ${sum}</p>
    <p>Average: ${average.toFixed(3)}</p>
`;
