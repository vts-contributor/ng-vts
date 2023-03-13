//@ts-nocheck
import $ from '../../shared/dom';
import { nextTick } from '../../shared/utils';

export default function slideToClickedSlide() {
  const carousel = this;
  const { params, $wrapperEl } = carousel;

  const slidesPerView =
    params.slidesPerView === 'auto' ? carousel.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = carousel.clickedIndex;
  let realIndex;
  if (params.loop) {
    if (carousel.animating) return;
    realIndex = parseInt($(carousel.clickedSlide).attr('data-carousel-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        slideToIndex < carousel.loopedSlides - slidesPerView / 2 ||
        slideToIndex > carousel.slides.length - carousel.loopedSlides + slidesPerView / 2
      ) {
        carousel.loopFix();
        slideToIndex = $wrapperEl
          .children(
            `.${params.slideClass}[data-carousel-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`
          )
          .eq(0)
          .index();

        nextTick(() => {
          carousel.slideTo(slideToIndex);
        });
      } else {
        carousel.slideTo(slideToIndex);
      }
    } else if (slideToIndex > carousel.slides.length - slidesPerView) {
      carousel.loopFix();
      slideToIndex = $wrapperEl
        .children(
          `.${params.slideClass}[data-carousel-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`
        )
        .eq(0)
        .index();

      nextTick(() => {
        carousel.slideTo(slideToIndex);
      });
    } else {
      carousel.slideTo(slideToIndex);
    }
  } else {
    carousel.slideTo(slideToIndex);
  }
}
