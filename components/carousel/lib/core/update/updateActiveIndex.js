export default function updateActiveIndex(newActiveIndex) {
  const Carousel = this;
  const translate = Carousel.rtlTranslate ? Carousel.translate : -Carousel.translate;
  const {
    slidesGrid,
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex,
  } = Carousel;
  let activeIndex = newActiveIndex;
  let snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (
          translate >= slidesGrid[i] &&
          translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2
        ) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      Carousel.snapIndex = snapIndex;
      Carousel.emit('snapIndexChange');
    }
    return;
  }

  // Get real index
  const realIndex = parseInt(
    Carousel.slides.eq(activeIndex).attr('data-Carousel-slide-index') || activeIndex,
    10,
  );

  Object.assign(Carousel, {
    snapIndex,
    realIndex,
    previousIndex,
    activeIndex,
  });
  Carousel.emit('activeIndexChange');
  Carousel.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    Carousel.emit('realIndexChange');
  }
  if (Carousel.initialized || Carousel.params.runCallbacksOnInit) {
    Carousel.emit('slideChange');
  }
}
