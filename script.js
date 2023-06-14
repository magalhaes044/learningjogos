var currentSlide = 0;
var slides = document.getElementsByClassName("slide");

function showSlide(n) {
  if (n >= slides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = n;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[currentSlide].style.display = "block";
}

function changeSlide(n) {
  showSlide(currentSlide + n);
}

showSlide(currentSlide);