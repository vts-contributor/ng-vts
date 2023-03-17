//@ts-nocheck
export default function onResize() {
  const carousel = this;

  const { params, el } = carousel;

  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    carousel.setBreakpoint();
  }

  // Save locks
  const { allowSlideNext, allowSlidePrev, snapGrid } = carousel;

  // Disable locks on resize
  carousel.allowSlideNext = true;
  carousel.allowSlidePrev = true;

  carousel.updateSize();
  carousel.updateSlides();

  carousel.updateSlidesClasses();
  if (
    (params.slidesPerView === 'auto' || params.slidesPerView > 1) &&
    carousel.isEnd &&
    !carousel.isBeginning &&
    !carousel.params.centeredSlides
  ) {
    carousel.slideTo(carousel.slides.length - 1, 0, false, true);
  } else {
    carousel.slideTo(carousel.activeIndex, 0, false, true);
  }

  if (carousel.autoplay && carousel.autoplay.running && carousel.autoplay.paused) {
    carousel.autoplay.run();
  }
  // Return locks after resize
  carousel.allowSlidePrev = allowSlidePrev;
  carousel.allowSlideNext = allowSlideNext;

  if (carousel.params.watchOverflow && snapGrid !== carousel.snapGrid) {
    carousel.checkOverflow();
  }
}
