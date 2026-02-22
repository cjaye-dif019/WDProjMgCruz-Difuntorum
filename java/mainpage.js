let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

   for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
   }

    slides[slideIndex - 1].style.display = "block";

    dots[slideIndex - 1].classList.add("active");
}

// autoslide
setInterval(function() {
    plusSlides(1);
}, 3000);
  
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}