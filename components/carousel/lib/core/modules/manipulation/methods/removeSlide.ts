//@ts-nocheck
export default function removeSlide(slidesIndexes) {
  const carousel = this;
  const { params, $wrapperEl, activeIndex } = carousel;

  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= carousel.loopedSlides;
    carousel.loopDestroy();
    carousel.slides = $wrapperEl.children(`.${params.slideClass}`);
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

  if (params.loop) {
    carousel.loopCreate();
  }

  if (!params.observer) {
    carousel.update();
  }
  if (params.loop) {
    carousel.slideTo(newActiveIndex + carousel.loopedSlides, 0, false);
  } else {
    carousel.slideTo(newActiveIndex, 0, false);
  }
}
