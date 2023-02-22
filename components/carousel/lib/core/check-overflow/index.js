function checkOverflow() {
  const Carousel = this;
  const { isLocked: wasLocked, params } = Carousel;
  const { slidesOffsetBefore } = params;

  if (slidesOffsetBefore) {
    const lastSlideIndex = Carousel.slides.length - 1;
    const lastSlideRightEdge =
      Carousel.slidesGrid[lastSlideIndex] +
      Carousel.slidesSizesGrid[lastSlideIndex] +
      slidesOffsetBefore * 2;
    Carousel.isLocked = Carousel.size > lastSlideRightEdge;
  } else {
    Carousel.isLocked = Carousel.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    Carousel.allowSlideNext = !Carousel.isLocked;
  }
  if (params.allowSlidePrev === true) {
    Carousel.allowSlidePrev = !Carousel.isLocked;
  }

  if (wasLocked && wasLocked !== Carousel.isLocked) {
    Carousel.isEnd = false;
  }
  if (wasLocked !== Carousel.isLocked) {
    Carousel.emit(Carousel.isLocked ? 'lock' : 'unlock');
  }
}

export default { checkOverflow };
