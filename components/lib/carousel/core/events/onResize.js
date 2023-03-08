export default function onResize() {
  const carousel = this;

  const { params, el } = carousel;

  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.vtsBreakpoints) {
    carousel.setBreakpoint();
  }

  // Save locks
  const { vtsAllowSlideNext, vtsAllowSlidePrev, snapGrid } = carousel;

  // Disable locks on resize
  carousel.vtsAllowSlideNext = true;
  carousel.vtsAllowSlidePrev = true;

  carousel.updateSize();
  carousel.updateSlides();

  carousel.updateSlidesClasses();
  if (
    (params.vtsSlidesPerView === 'auto' || params.vtsSlidesPerView > 1) &&
    carousel.isEnd &&
    !carousel.isBeginning &&
    !carousel.params.centeredSlides
  ) {
    carousel.slideTo(carousel.slides.length - 1, 0, false, true);
  } else {
    carousel.slideTo(carousel.activeIndex, 0, false, true);
  }

  if (carousel.vtsAutoplay && carousel.vtsAutoplay.running && carousel.vtsAutoplay.paused) {
    carousel.vtsAutoplay.run();
  }
  // Return locks after resize
  carousel.vtsAllowSlidePrev = vtsAllowSlidePrev;
  carousel.vtsAllowSlideNext = vtsAllowSlideNext;

  if (carousel.params.watchOverflow && snapGrid !== carousel.snapGrid) {
    carousel.checkOverflow();
  }
}
