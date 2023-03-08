//@ts-nocheck
export default function removeSlide(slidesIndexes) {
  const carousel = this;
  const { params, $wrapperEl, activeIndex } = carousel;

  let activeIndexBuffer = activeIndex;
  if (params.vtsLoop) {
    activeIndexBuffer -= carousel.vtsLoopedSlides;
    carousel.loopDestroy();
    carousel.slides = $wrapperEl.children(`.${params.vtsSlideClass}`);
  }
  let newActiveIndex = activeIndexBuffer;
  let indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (carousel.slides[indexToRemove]) carousel.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (carousel.slides[indexToRemove]) carousel.slides.eq(indexToRemove).remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.vtsLoop) {
    carousel.loopCreate();
  }

  if (!params.observer) {
    carousel.update();
  }
  if (params.vtsLoop) {
    carousel.slideTo(newActiveIndex + carousel.vtsLoopedSlides, 0, false);
  } else {
    carousel.slideTo(newActiveIndex, 0, false);
  }
}
