//@ts-nocheck
export default function loopFix() {
  const carousel = this;

  carousel.emit('beforeLoopFix');

  const {
    activeIndex,
    slides,
    loopedSlides,
    allowSlidePrev,
    allowSlideNext,
    snapGrid,
    rtlTranslate: rtl
  } = carousel;
  let newIndex;
  carousel.allowSlidePrev = true;
  carousel.allowSlideNext = true;

  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - carousel.getTranslate();

  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    const slideChanged = carousel.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      carousel.setTranslate((rtl ? -carousel.translate : carousel.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    const slideChanged = carousel.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      carousel.setTranslate((rtl ? -carousel.translate : carousel.translate) - diff);
    }
  }
  carousel.allowSlidePrev = allowSlidePrev;
  carousel.allowSlideNext = allowSlideNext;

  carousel.emit('loopFix');
}
