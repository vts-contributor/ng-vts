import $ from '../../shared/dom.js';
import { nextTick } from '../../shared/utils.js';

export default function slideToClickedSlide() {
  const Carousel = this;
  const { params, $wrapperEl } = Carousel;

  const vtsSlidesPerView =
    params.vtsSlidesPerView === 'auto' ? Carousel.slidesPerViewDynamic() : params.vtsSlidesPerView;
  let slideToIndex = Carousel.clickedIndex;
  let realIndex;
  if (params.loop) {
    if (Carousel.animating) return;
    realIndex = parseInt($(Carousel.clickedSlide).attr('data-Carousel-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        slideToIndex < Carousel.loopedSlides - vtsSlidesPerView / 2 ||
        slideToIndex > Carousel.slides.length - Carousel.loopedSlides + vtsSlidesPerView / 2
      ) {
        Carousel.loopFix();
        slideToIndex = $wrapperEl
          .children(
            `.${params.slideClass}[data-Carousel-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`,
          )
          .eq(0)
          .index();

        nextTick(() => {
          Carousel.slideTo(slideToIndex);
        });
      } else {
        Carousel.slideTo(slideToIndex);
      }
    } else if (slideToIndex > Carousel.slides.length - vtsSlidesPerView) {
      Carousel.loopFix();
      slideToIndex = $wrapperEl
        .children(
          `.${params.slideClass}[data-Carousel-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`,
        )
        .eq(0)
        .index();

      nextTick(() => {
        Carousel.slideTo(slideToIndex);
      });
    } else {
      Carousel.slideTo(slideToIndex);
    }
  } else {
    Carousel.slideTo(slideToIndex);
  }
}
