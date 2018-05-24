var carousel, modal, pictureCarousel;
$(function(){

  pictureCarousel = $('#Carousel').glide({
    type: 'carousel',
    paddings: '15%',
    autoplay: false,
    autoheight: true,
    // duringTransition: switchedImage
  });

  $('.sidenav').sidenav();
  $('.parallax').parallax();

  var carouselElem = $('.carousel.carousel-slider')[0];
  carousel = M.Carousel.init(carouselElem, {
    fullWidth: true,
    indicators: true,
    onCycleTo: changedSnippet
  });

  var modalElem = $('.modal');
  modal = M.Modal.init(modalElem, {
    startingTop: '10%',
    endingTop: '10%'
  });

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });

});

function nextSnippet() {
  carousel.next();
}

function prevSnippet() {
  carousel.prev();
}

function changedSnippet(elem) {
  index = elem.attributes.index.value;

  all = document.getElementsByClassName('testimonial');
  for (var i = 0; i < all.length; i++) {
    all[i].classList.add('hidden');
    if (i == index) {
      all[i].classList.remove('hidden');
    }
  }
  selected = document.getElementsByClassName('testimonial')[index];
}
