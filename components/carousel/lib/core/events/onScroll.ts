//@ts-nocheck
export default function onScroll() {
  const carousel = this;
  const { wrapperEl, rtlTranslate, enabled } = carousel;
  if (!enabled) return;
  carousel.previousTranslate = carousel.translate;
  if (carousel.isHorizontal()) {
    carousel.translate = -wrapperEl.scrollLeft;
  } else {
    carousel.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (carousel.translate === 0) carousel.translate = 0;

  carousel.updateActiveIndex();
  carousel.updateSlidesClasses();

  let newProgress;
  const translatesDiff = carousel.maxTranslate() - carousel.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (carousel.translate - carousel.minTranslate()) / translatesDiff;
  }
  if (newProgress !== carousel.progress) {
    carousel.updateProgress(rtlTranslate ? -carousel.translate : carousel.translate);
  }

  carousel.emit('setTranslate', carousel.translate, false);
}
