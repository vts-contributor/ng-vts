//@ts-nocheck
export default function updateActiveIndex(newActiveIndex) {
  const carousel = this;
  const translate = carousel.rtlTranslate ? carousel.translate : -carousel.translate;
  const {
    slidesGrid,
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = carousel;
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
      carousel.snapIndex = snapIndex;
      carousel.emit('snapIndexChange');
    }
    return;
  }

  // Get real index
  const realIndex = parseInt(
    carousel.slides.eq(activeIndex).attr('data-carousel-slide-index') || activeIndex,
    10
  );

  Object.assign(carousel, {
    snapIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  carousel.emit('activeIndexChange');
  carousel.emit('snapIndexChange');
  carousel.emit('realIndexChange');

  if (carousel.initialized || carousel.params.runCallbacksOnInit) {
    carousel.emit('slideChange');
  }
}
