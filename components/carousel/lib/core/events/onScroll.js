export default function onScroll() {
  const Carousel = this;
  const { wrapperEl, rtlTranslate, enabled } = Carousel;
  if (!enabled) return;
  Carousel.previousTranslate = Carousel.translate;
  if (Carousel.isHorizontal()) {
    Carousel.translate = -wrapperEl.scrollLeft;
  } else {
    Carousel.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (Carousel.translate === 0) Carousel.translate = 0;

  Carousel.updateActiveIndex();
  Carousel.updateSlidesClasses();

  let newProgress;
  const translatesDiff = Carousel.maxTranslate() - Carousel.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (Carousel.translate - Carousel.minTranslate()) / translatesDiff;
  }
  if (newProgress !== Carousel.progress) {
    Carousel.updateProgress(rtlTranslate ? -Carousel.translate : Carousel.translate);
  }

  Carousel.emit('setTranslate', Carousel.translate, false);
}
