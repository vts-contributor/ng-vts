/* eslint no-unused-vars: "off" */
export default function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const Carousel = this;
  const { params, animating, snapGrid, slidesGrid, rtlTranslate, enabled } = Carousel;
  if (!enabled) return Carousel;

  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    Carousel.loopFix();
    // eslint-disable-next-line
    Carousel._clientLeft = Carousel.$wrapperEl[0].clientLeft;
  }
  const translate = rtlTranslate ? Carousel.translate : -Carousel.translate;

  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));

  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = Carousel.activeIndex - 1;
    if (
      params.vtsSlidesPerView === 'auto' &&
      params.slidesPerGroup === 1 &&
      params.slidesPerGroupAuto
    ) {
      prevIndex = prevIndex - Carousel.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && Carousel.isBeginning) {
    const lastIndex =
      Carousel.params.virtual && Carousel.params.virtual.enabled && Carousel.virtual
        ? Carousel.virtual.slides.length - 1
        : Carousel.slides.length - 1;
    return Carousel.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return Carousel.slideTo(prevIndex, speed, runCallbacks, internal);
}
