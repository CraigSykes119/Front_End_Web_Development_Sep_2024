let sum = 0;
let count = 0;
let num;
let table = document.getElementById('resultsTable');

while (true) {
    num = parseFloat(prompt("Enter a number (-1 to quit):"));
    if (num === -1) break;
    sum += num;
    count++;

    let row = table.insertRow();
    row.insertCell(0).textContent = num;
    row.insertCell(1).textContent = sum;
    row.insertCell(2).textContent = (sum / count).toFixed(3);
}
