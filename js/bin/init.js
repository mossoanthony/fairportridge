var carousel;
var modal;
(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

    var carouselElem = document.querySelector('.carousel.carousel-slider');
    carousel = M.Carousel.init(carouselElem, {
      fullWidth: true,
      indicators: true,
      onCycleTo: changedSnippet
    });

  var modalElem = document.querySelector('.modal');
  modal = M.Modal.init(modalElem, {
    startingTop: '10%',
    endingTop: '10%'
  });

  }); // end of document ready
})(jQuery); // end of jQuery name space

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
