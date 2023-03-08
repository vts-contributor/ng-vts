function checkOverflow() {
  const carousel = this;
  const { isLocked: wasLocked, params } = carousel;
  const { slidesOffsetBefore } = params;

  if (slidesOffsetBefore) {
    const lastSlideIndex = carousel.slides.length - 1;
    const lastSlideRightEdge =
      carousel.slidesGrid[lastSlideIndex] +
      carousel.slidesSizesGrid[lastSlideIndex] +
      slidesOffsetBefore * 2;
    carousel.isLocked = carousel.size > lastSlideRightEdge;
  } else {
    carousel.isLocked = carousel.snapGrid.length === 1;
  }
  if (params.vtsAllowSlideNext === true) {
    carousel.vtsAllowSlideNext = !carousel.isLocked;
  }
  if (params.vtsAllowSlidePrev === true) {
    carousel.vtsAllowSlidePrev = !carousel.isLocked;
  }

  if (wasLocked && wasLocked !== carousel.isLocked) {
    carousel.isEnd = false;
  }
  if (wasLocked !== carousel.isLocked) {
    carousel.emit(carousel.isLocked ? 'lock' : 'unlock');
  }
}

export default { checkOverflow };
