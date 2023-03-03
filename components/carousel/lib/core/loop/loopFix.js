export default function loopFix() {
  const carousel = this;

  carousel.emit('beforeLoopFix');

  const {
    activeIndex,
    slides,
    vtsLoopedSlides,
    vtsAllowSlidePrev,
    vtsAllowSlideNext,
    snapGrid,
    rtlTranslate: rtl,
  } = carousel;
  let newIndex;
  carousel.vtsAllowSlidePrev = true;
  carousel.vtsAllowSlideNext = true;

  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - carousel.getTranslate();

  // Fix For Negative Oversliding
  if (activeIndex < vtsLoopedSlides) {
    newIndex = slides.length - vtsLoopedSlides * 3 + activeIndex;
    newIndex += vtsLoopedSlides;
    const slideChanged = carousel.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      carousel.setTranslate((rtl ? -carousel.translate : carousel.translate) - diff);
    }
  } else if (activeIndex >= slides.length - vtsLoopedSlides) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + vtsLoopedSlides;
    newIndex += vtsLoopedSlides;
    const slideChanged = carousel.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      carousel.setTranslate((rtl ? -carousel.translate : carousel.translate) - diff);
    }
  }
  carousel.vtsAllowSlidePrev = vtsAllowSlidePrev;
  carousel.vtsAllowSlideNext = vtsAllowSlideNext;

  carousel.emit('loopFix');
}
