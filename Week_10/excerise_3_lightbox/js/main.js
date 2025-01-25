// code is wrapped in an IIFE (Immediately Invoked Function Expression). See https://developer.mozilla.org/en-US/docs/Glossary/IIFE for more details
(() => {
  // globals
  let currImage = 0;
  const body = document.querySelector("body"),
        lightBox = document.querySelector(".lightBox"),
        images = document.querySelectorAll(".gImg"),
        showImg = lightBox.querySelector(".showImg img"),
        close = lightBox.querySelector(".close");

  // Function to generate navigation dots
  function generateNavigationDots() {
    const lightBoxContent = lightBox.querySelector('.lightBox_content');
    // Create a container for navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('navigation-dots');
    lightBoxContent.appendChild(dotsContainer);

    // Add a dot for each image
    images.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (index === 0) dot.classList.add('active'); // Set the first dot as active
      dotsContainer.appendChild(dot);

      // Add click event to each dot
      dot.addEventListener('click', () => {
        currImage = index;
        showImg.src = images[currImage].src;
        updateActiveDot(index);
      });
    });
  }

  // Function to update active dot
  function updateActiveDot(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Lightbox initialization
  function lightbox() {
    generateNavigationDots(); // Dynamically add navigation dots

    images.forEach((image, index) => {
      image.addEventListener("click", () => {
        showImage(index);
        updateActiveDot(index);
      });
    });

    // Add next/prev links to lightbox
    lightBox.querySelector('.lightBox_content .showImg').insertAdjacentHTML("afterend",
    `<div class="navigation-buttons">
      <a class="previous">❮</a>
      <a class="next">❯</a>        
    </div>`);

    lightBox.querySelector('.navigation-buttons .previous').addEventListener("click", () => {
      if (currImage !== 0) {
        currImage -= 1;
        showImg.src = images[currImage].src;
        updateActiveDot(currImage);
      } 
    });

    lightBox.querySelector('.navigation-buttons .next').addEventListener("click", () => {
      if (currImage !== (images.length - 1)) {
        currImage += 1;
        showImg.src = images[currImage].src;
        updateActiveDot(currImage);
      }
    });

    close.addEventListener('click', () => {
      lightBox.style.display = "none";
      body.style.overflow = "visible";
    });
  }

  // Function to show an image in the lightbox
  function showImage(imageIndex) {
    showImg.src = images[imageIndex].src;
    currImage = imageIndex;
    lightBox.style.display = "block";
    body.style.overflow = "hidden";
  }

  // Initialize the lightbox
  function init() {
    lightbox();
  }

  // Wait for the DOM to load before initializing
  window.addEventListener("load", () => {
    init();
  });
})();
