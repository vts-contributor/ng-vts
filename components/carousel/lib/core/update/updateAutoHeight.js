import $ from '../../shared/dom.js';

export default function updateAutoHeight(vtsSpeed) {
  const carousel = this;
  const activeSlides = [];
  const isVirtual = carousel.virtual && carousel.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof vtsSpeed === 'number') {
    carousel.setTransition(vtsSpeed);
  } else if (vtsSpeed === true) {
    carousel.setTransition(carousel.params.vtsSpeed);
  }

  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return carousel.slides.filter(
        (el) => parseInt(el.getAttribute('data-carousel-slide-index'), 10) === index,
      )[0];
    }
    return carousel.slides.eq(index)[0];
  };
  // Find slides currently in view
  if (carousel.params.vtsSlidesPerView !== 'auto' && carousel.params.vtsSlidesPerView > 1) {
    if (carousel.params.centeredSlides) {
      (carousel.visibleSlides || $([])).each((slide) => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(carousel.params.vtsSlidesPerView); i += 1) {
        const index = carousel.activeIndex + i;
        if (index > carousel.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(carousel.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) carousel.$wrapperEl.css('height', `${newHeight}px`);
}
