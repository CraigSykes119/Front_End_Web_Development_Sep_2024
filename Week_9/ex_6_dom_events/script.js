// Function to change color
function changeColour(paragraph) {
    paragraph.style.color = "red"; // Set color to red
}

// Add event listeners
document.getElementById('btn1').addEventListener('click', function() {
    changeColour(document.getElementById('para1'));
});

document.getElementById('btn2').addEventListener('click', function() {
    changeColour(document.getElementById('para2'));
});

// Create and append a new paragraph
let newPara = document.createElement('p');
newPara.textContent = "This is a new paragraph.";
document.getElementById('container').appendChild(newPara);

// Add event listener to change background color on click
document.getElementById('para1').addEventListener('click', function() {
    this.style.backgroundColor = "yellow";
});

// Add event listener to hover and add/remove class
document.getElementById('para2').addEventListener('mouseover', function() {
    this.classList.add('highlight');
});
document.getElementById('para2').addEventListener('mouseout', function() {
    this.classList.remove('highlight');
});

// Add "Delete" button after each paragraph
document.querySelectorAll('p').forEach(function(p) {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    p.appendChild(deleteButton);
    
    deleteButton.addEventListener('click', function() {
        p.remove();
    });
});
