export default function loopFix() {
  const Carousel = this;

  Carousel.emit('beforeLoopFix');

  const {
    activeIndex,
    slides,
    loopedSlides,
    allowSlidePrev,
    allowSlideNext,
    snapGrid,
    rtlTranslate: rtl,
  } = Carousel;
  let newIndex;
  Carousel.allowSlidePrev = true;
  Carousel.allowSlideNext = true;

  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - Carousel.getTranslate();

  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    const slideChanged = Carousel.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      Carousel.setTranslate((rtl ? -Carousel.translate : Carousel.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    const slideChanged = Carousel.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      Carousel.setTranslate((rtl ? -Carousel.translate : Carousel.translate) - diff);
    }
  }
  Carousel.allowSlidePrev = allowSlidePrev;
  Carousel.allowSlideNext = allowSlideNext;

  Carousel.emit('loopFix');
}
