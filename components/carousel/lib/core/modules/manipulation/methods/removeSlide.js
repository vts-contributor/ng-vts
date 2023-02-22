export default function removeSlide(slidesIndexes) {
  const Carousel = this;
  const { params, $wrapperEl, activeIndex } = Carousel;

  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= Carousel.loopedSlides;
    Carousel.loopDestroy();
    Carousel.slides = $wrapperEl.children(`.${params.slideClass}`);
  }
  let newActiveIndex = activeIndexBuffer;
  let indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (Carousel.slides[indexToRemove]) Carousel.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (Carousel.slides[indexToRemove]) Carousel.slides.eq(indexToRemove).remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    Carousel.loopCreate();
  }

  if (!params.observer) {
    Carousel.update();
  }
  if (params.loop) {
    Carousel.slideTo(newActiveIndex + Carousel.loopedSlides, 0, false);
  } else {
    Carousel.slideTo(newActiveIndex, 0, false);
  }
}
