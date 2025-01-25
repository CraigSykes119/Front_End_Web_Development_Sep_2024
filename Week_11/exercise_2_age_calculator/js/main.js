// code is wrapped in an IIFE (Immediately Invoked Function Expression)
(() => {
  // globals
  const calcButtons = document.querySelector(".calculator .calculator-buttons");
  const form = document.getElementById("age-form");
  const output = document.getElementById("output");
  const birthdayInput = document.getElementById("birthday");
  let currentDisplay = "0";
  let resultDisplay = false;

  // Set the max attribute dynamically to yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  birthdayInput.setAttribute("max", yesterday.toISOString().split("T")[0]);

  // Calculator functions
  function appendToDisplay(value) {
    if (currentDisplay === "0" || resultDisplay) {
      currentDisplay = value;
    } else {
      currentDisplay += value;
    }
    resultDisplay = false;
    updateDisplay();
  }

  function updateDisplay() {
    const displayElement = document.getElementById("display");
    displayElement.textContent = currentDisplay;
  }

  function calculateResult() {
    try {
      // execute the currentDisplay string as JS code (recommended). Alternative: eval()
      const result = Function("return " + currentDisplay)();
      currentDisplay += `\n${result.toString()}`;
      updateDisplay();
    } catch (error) {
      currentDisplay += "\nError";
      updateDisplay();
    }
    resultDisplay = true;
  }

  function clearLastElement() {
    currentDisplay = currentDisplay.slice(0, -1);
    if (currentDisplay === "") {
      currentDisplay = "0";
    }
    updateDisplay();
  }

  function clearDisplay() {
    currentDisplay = "0";
    updateDisplay();
  }

  // Age calculator functions
  function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }

  // Event listener for age calculator form
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the birthday value from FormData
    const formData = new FormData(form);
    const birthday = formData.get("birthday");

    if (!birthday) {
      output.textContent = "Please enter a valid date.";
      return;
    }

    // Calculate the age
    const { years, months, days } = calculateAge(birthday);

    // Update the output using template strings
    output.innerHTML = `
      <p>You are ${years} years, ${months} months, and ${days} days old.</p>
    `;
  });

  // Initialize calculator buttons
  window.addEventListener("load", (event) => {
    calcButtons.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "button") {
        switch (event.target.textContent) {
          case "CE":
            clearLastElement();
            break;
          case "C":
            clearDisplay();
            break;
          case "=":
            calculateResult();
            break;
          default:
            // pass value of the clicked button to appendToDisplay()
            appendToDisplay(event.target.textContent);
        }
      }
    });
  });
})();
