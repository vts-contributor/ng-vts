import $ from '../../shared/dom.js';
import { nextTick } from '../../shared/utils.js';

export default function slideToClickedSlide() {
  const swiper = this;
  const { params, $wrapperEl } = swiper;

  const vtsSlidesPerView =
    params.vtsSlidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.vtsSlidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        slideToIndex < swiper.loopedSlides - vtsSlidesPerView / 2 ||
        slideToIndex > swiper.slides.length - swiper.loopedSlides + vtsSlidesPerView / 2
      ) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(
            `.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`,
          )
          .eq(0)
          .index();

        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - vtsSlidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl
        .children(
          `.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`,
        )
        .eq(0)
        .index();

      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
