(() => {
  // Globals
  const calcButtons = document.querySelector(".calculator .calculator-buttons");
  let currentDisplay = "0";
  let resultDisplay = false;

  // Appends a value to the display
  function appendToDisplay(value) {
    if (currentDisplay === "0" || resultDisplay) {
      currentDisplay = value;
    } else {
      currentDisplay += value;
    }
    resultDisplay = false;
    updateDisplay();
  }

  // Updates the display content
  function updateDisplay() {
    const displayElement = document.getElementById("display");
    displayElement.textContent = currentDisplay;
  }

  // Evaluates the expression and displays the result
  function calculateResult() {
    try {
      const result = Function("return " + currentDisplay)(); // Using Function constructor to evaluate safely
      currentDisplay += `\n${result.toString()}`;
      updateDisplay();
    } catch (error) {
      currentDisplay += "\nError";
      updateDisplay();
    }
    resultDisplay = true;
  }

  // Clears the last character in the display
  function clearLastElement() {
    currentDisplay = currentDisplay.slice(0, -1);
    if (currentDisplay === "") {
      currentDisplay = "0";
    }
    updateDisplay();
  }

  // Clears the entire display
  function clearDisplay() {
    currentDisplay = "0";
    updateDisplay();
  }

  // Handles keyboard input
  function handleKeydown(event) {
    switch (event.key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "+":
      case "-":
      case "*":
      case "/":
      case ".":
        appendToDisplay(event.key); // Add numeric or operator keys to the display
        break;
      case "Enter":
      case "=":
        calculateResult(); // Calculate on Enter or Equals key
        break;
      case "Backspace":
        clearLastElement(); // Clear the last character on Backspace
        break;
      case "Escape":
        clearDisplay(); // Clear the display on Escape
        break;
      default:
        // Ignore other keys
        break;
    }

    event.preventDefault(); // Prevent default browser behavior
  }

  // Initializes event listeners
  function init() {
    // Handle button clicks
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
            appendToDisplay(event.target.textContent);
        }
      }
    });

    // Handle keyboard input
    window.addEventListener("keydown", handleKeydown);
  }

  // Initialize on page load
  window.addEventListener("load", init);
})();
