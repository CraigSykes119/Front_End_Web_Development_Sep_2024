let sum = 0;
let count = 0;
let num;

while (true) {
    num = parseFloat(prompt("Enter a number (-1 to quit):"));
    if (num === -1) break;
    sum += num;
    count++;
}

let average = sum / count;

document.getElementById('result').innerHTML = `
    <p>Sum: ${sum}</p>
    <p>Average: ${average.toFixed(3)}</p>
    <p>Entries: ${count}</p>
`;
