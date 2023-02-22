export default function onResize() {
  const Carousel = this;

  const { params, el } = Carousel;

  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    Carousel.setBreakpoint();
  }

  // Save locks
  const { allowSlideNext, allowSlidePrev, snapGrid } = Carousel;

  // Disable locks on resize
  Carousel.allowSlideNext = true;
  Carousel.allowSlidePrev = true;

  Carousel.updateSize();
  Carousel.updateSlides();

  Carousel.updateSlidesClasses();
  if (
    (params.vtsSlidesPerView === 'auto' || params.vtsSlidesPerView > 1) &&
    Carousel.isEnd &&
    !Carousel.isBeginning &&
    !Carousel.params.centeredSlides
  ) {
    Carousel.slideTo(Carousel.slides.length - 1, 0, false, true);
  } else {
    Carousel.slideTo(Carousel.activeIndex, 0, false, true);
  }

  if (Carousel.autoplay && Carousel.autoplay.running && Carousel.autoplay.paused) {
    Carousel.autoplay.run();
  }
  // Return locks after resize
  Carousel.allowSlidePrev = allowSlidePrev;
  Carousel.allowSlideNext = allowSlideNext;

  if (Carousel.params.watchOverflow && snapGrid !== Carousel.snapGrid) {
    Carousel.checkOverflow();
  }
}
