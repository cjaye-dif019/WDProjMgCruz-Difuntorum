
//menu settings
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

let slideIndex = 1;
let slideTimer;

// Initialize the slideshow
showSlides(slideIndex);
autoSlides();

// Next/previous controls (if you add arrows later)
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer();
}

// Thumbnail image controls (The dots)
function currentSlide(n) {
  showSlides(slideIndex = n);
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // Remove "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show the current slide and highlight the dot
  if (slides[slideIndex-1]) {
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }
}

// Automatic transition
function autoSlides() {
  slideTimer = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000); // Changes image every 5 seconds
}

// Resets timer when user manually clicks a dot
function resetTimer() {
  clearInterval(slideTimer);
  autoSlides();
}