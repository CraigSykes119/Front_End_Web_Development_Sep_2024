document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("age-form");
  const birthdayInput = document.getElementById("birthday");
  const output = document.getElementById("output");

  // Set the max and default value of the input to yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split("T")[0];
  birthdayInput.setAttribute("max", formattedDate);
  birthdayInput.setAttribute("value", formattedDate);

  // Calculate age function
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

  // Event listener for form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const birthday = formData.get("birthday");

    if (!birthday) {
      output.textContent = "Please enter a valid date.";
      return;
    }

    const { years, months, days } = calculateAge(birthday);

    // Output the result using template strings
    output.innerHTML = `
      <p>You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.</p>
    `;
  });
});
