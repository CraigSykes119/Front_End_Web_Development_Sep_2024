let num = parseInt(prompt("Enter an integer between 1 and 20:"));

if (!isNaN(num) && num > 1 && num <= 20) {
    let output = "";
    for (let i = num; i >= 1; i--) {
        let factorial = 1;
        for (let j = i; j >= 1; j--) {
            factorial *= j;
        }
        output += `Factorial of ${i} is ${factorial}<br>`;
    }
    document.getElementById('factorials').innerHTML = output;
} else {
    alert("Please enter a number between 1 and 20.");
}
