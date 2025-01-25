class CarouselSlider {
  #componentCarousel;
  #navigationDots;
  #navigationButtons;
  #slides;
  #currentIndex;

  constructor() {
    // Initialize private properties
    this.#componentCarousel = document.querySelector('.component-carousel');
    this.#navigationButtons = this.#componentCarousel.querySelectorAll('.navigation-buttons > a');
    this.#slides = this.#componentCarousel.getElementsByClassName('slide');
    this.#currentIndex = 0;

    this.#createNavigationDots();
    this.#navigationDots = this.#componentCarousel.querySelectorAll('.navigation-dot');
    this.#addEventListeners();
    this.#showSlides(this.#currentIndex);
  }

  // Create navigation dots dynamically
  #createNavigationDots() {
    const navigationDotContainer = this.#componentCarousel.querySelector('.navigation-dot-container');
    navigationDotContainer.innerHTML = ''; // Clear existing dots
    for (let i = 0; i < this.#slides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'navigation-dot';
      if (i === 0) dot.classList.add('active');
      navigationDotContainer.appendChild(dot);
    }
  }

  // Show the slide at the specified index
  #showSlides(index) {
    Array.from(this.#slides).forEach(slide => (slide.style.display = 'none'));
    this.#navigationDots.forEach(dot => dot.classList.remove('active'));
    this.#slides[index].style.display = 'block';
    this.#navigationDots[index].classList.add('active');
  }

  // Increment the index with wraparound
  #incrementIndex(increment) {
    return (this.#currentIndex + increment + this.#slides.length) % this.#slides.length;
  }

  // Add event listeners for buttons and dots
  #addEventListeners() {
    // Navigation buttons
    this.#navigationButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        if (button.classList.contains('next')) {
          this.#currentIndex = this.#incrementIndex(1);
        } else if (button.classList.contains('previous')) {
          this.#currentIndex = this.#incrementIndex(-1);
        }
        this.#showSlides(this.#currentIndex);
      });
    });

    // Navigation dots
    this.#navigationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.#currentIndex = index;
        this.#showSlides(this.#currentIndex);
      });
    });
  }
}

// Initialize the carousel slider when the page loads
window.addEventListener('load', () => {
  new CarouselSlider();
});
