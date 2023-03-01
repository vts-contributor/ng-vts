import $ from '../../shared/dom.js';
import { nextTick } from '../../shared/utils.js';

export default function slideToClickedSlide() {
  const carousel = this;
  const { params, $wrapperEl } = carousel;

  const vtsSlidesPerView =
    params.vtsSlidesPerView === 'auto' ? carousel.slidesPerViewDynamic() : params.vtsSlidesPerView;
  let slideToIndex = carousel.clickedIndex;
  let realIndex;
  if (params.vtsLoop) {
    if (carousel.animating) return;
    realIndex = parseInt($(carousel.clickedSlide).attr('data-carousel-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        slideToIndex < carousel.vtsLoopedSlides - vtsSlidesPerView / 2 ||
        slideToIndex > carousel.slides.length - carousel.vtsLoopedSlides + vtsSlidesPerView / 2
      ) {
        carousel.loopFix();
        slideToIndex = $wrapperEl
          .children(
            `.${params.vtsSlideClass}[data-carousel-slide-index="${realIndex}"]:not(.${params.vtsSlideDuplicateClass})`,
          )
          .eq(0)
          .index();

        nextTick(() => {
          carousel.slideTo(slideToIndex);
        });
      } else {
        carousel.slideTo(slideToIndex);
      }
    } else if (slideToIndex > carousel.slides.length - vtsSlidesPerView) {
      carousel.loopFix();
      slideToIndex = $wrapperEl
        .children(
          `.${params.vtsSlideClass}[data-carousel-slide-index="${realIndex}"]:not(.${params.vtsSlideDuplicateClass})`,
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
