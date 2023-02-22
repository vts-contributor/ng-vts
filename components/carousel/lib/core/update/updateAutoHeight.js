import $ from '../../shared/dom.js';

export default function updateAutoHeight(speed) {
  const Carousel = this;
  const activeSlides = [];
  const isVirtual = Carousel.virtual && Carousel.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === 'number') {
    Carousel.setTransition(speed);
  } else if (speed === true) {
    Carousel.setTransition(Carousel.params.speed);
  }

  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return Carousel.slides.filter(
        (el) => parseInt(el.getAttribute('data-Carousel-slide-index'), 10) === index,
      )[0];
    }
    return Carousel.slides.eq(index)[0];
  };
  // Find slides currently in view
  if (Carousel.params.vtsSlidesPerView !== 'auto' && Carousel.params.vtsSlidesPerView > 1) {
    if (Carousel.params.centeredSlides) {
      (Carousel.visibleSlides || $([])).each((slide) => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(Carousel.params.vtsSlidesPerView); i += 1) {
        const index = Carousel.activeIndex + i;
        if (index > Carousel.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(Carousel.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) Carousel.$wrapperEl.css('height', `${newHeight}px`);
}
