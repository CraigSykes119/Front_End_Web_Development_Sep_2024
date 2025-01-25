// Get all the `.image-box` elements
const imageBoxes = document.querySelectorAll('.image-box');

// Loop through each `.image-box`
imageBoxes.forEach(imageBox => {
  // Get the image element inside the box
  const img = imageBox.querySelector('img');

  // Create a new <a> element
  const link = document.createElement('a');
  link.classList.add('image-box-link'); // Add class to the link
  link.setAttribute('data-gall', 'gallery01'); // Add data-gall attribute for gallery grouping
  link.setAttribute('href', img.src); // Set href to the image's src

  // Wrap the image with the <a> element
  imageBox.appendChild(link);
  link.appendChild(img);
});

// Initialize VenoBox
new VenoBox({
  selector: '.image-box-link',
  numeration: true,
  infinigall: true,
  share: true,
  spinner: 'plane'
});
