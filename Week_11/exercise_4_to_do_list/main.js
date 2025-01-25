document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const todoTableBody = document.getElementById("todo-table").querySelector("tbody");
  
    // Event listener for form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Get form data
      const formData = new FormData(form);
      const title = formData.get("title");
      const description = formData.get("description");
      const priority = formData.get("priority");
  
      // Add new to-do item to the table
      addTodoItem(title, description, priority);
  
      // Clear the form
      form.reset();
    });
  
    // Add a new to-do item to the table
    function addTodoItem(title, description, priority) {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td>${priority}</td>
        <td>
          <button class="delete-btn">Delete</button>
        </td>
      `;
  
      // Add event listener for the delete button
      row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
      });
  
      todoTableBody.appendChild(row);
    }
  });
  