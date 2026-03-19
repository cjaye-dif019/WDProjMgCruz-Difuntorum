
//menu settings
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

let slideIndex = 1;
let slideTimer;

// slideshow functions and stuff
showSlides(slideIndex);
autoSlides();

// next/previous
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer();
}

// dots
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
  
  // hide slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  //remove active
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  //show current highlighted dot
  if (slides[slideIndex-1]) {
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }
}

// automatic transition
function autoSlides() {
  slideTimer = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000); // every 5 second changing
}

// resets the timer when a dot is clicked
function resetTimer() {
  clearInterval(slideTimer);
  autoSlides();
}