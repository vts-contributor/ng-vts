//@ts-nocheck
import $ from '../../shared/dom';

export default function updateClickedSlide(e) {
  const carousel = this;
  const params = carousel.params;
  const slide = $(e).closest(`.${params.slideClass}`)[0];
  let slideFound = false;
  let slideIndex;

  if (slide) {
    for (let i = 0; i < carousel.slides.length; i += 1) {
      if (carousel.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }

  if (slide && slideFound) {
    carousel.clickedSlide = slide;
    if (carousel.virtual && carousel.params.virtual.enabled) {
      carousel.clickedIndex = parseInt($(slide).attr('data-carousel-slide-index'), 10);
    } else {
      carousel.clickedIndex = slideIndex;
    }
  } else {
    carousel.clickedSlide = undefined;
    carousel.clickedIndex = undefined;
    return;
  }
  if (
    params.slideToClickedSlide &&
    carousel.clickedIndex !== undefined &&
    carousel.clickedIndex !== carousel.activeIndex
  ) {
    carousel.slideToClickedSlide();
  }
}
