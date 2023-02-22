import $ from '../../shared/dom.js';

export default function updateClickedSlide(e) {
  const Carousel = this;
  const params = Carousel.params;
  const slide = $(e).closest(`.${params.slideClass}`)[0];
  let slideFound = false;
  let slideIndex;

  if (slide) {
    for (let i = 0; i < Carousel.slides.length; i += 1) {
      if (Carousel.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }

  if (slide && slideFound) {
    Carousel.clickedSlide = slide;
    if (Carousel.virtual && Carousel.params.virtual.enabled) {
      Carousel.clickedIndex = parseInt($(slide).attr('data-Carousel-slide-index'), 10);
    } else {
      Carousel.clickedIndex = slideIndex;
    }
  } else {
    Carousel.clickedSlide = undefined;
    Carousel.clickedIndex = undefined;
    return;
  }
  if (
    params.slideToClickedSlide &&
    Carousel.clickedIndex !== undefined &&
    Carousel.clickedIndex !== Carousel.activeIndex
  ) {
    Carousel.slideToClickedSlide();
  }
}
