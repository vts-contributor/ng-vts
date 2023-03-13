//@ts-nocheck
/* eslint no-unused-vars: "off" */
export default function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const carousel = this;
  const { params, animating, snapGrid, slidesGrid, rtlTranslate, enabled } = carousel;
  if (!enabled) return carousel;

  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    carousel.loopFix();
    // eslint-disable-next-line
    carousel._clientLeft = carousel.$wrapperEl[0].clientLeft;
  }
  const translate = rtlTranslate ? carousel.translate : -carousel.translate;

  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate);
  const normalizedSnapGrid = snapGrid.map(val => normalize(val));

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
    if (prevIndex < 0) prevIndex = carousel.activeIndex - 1;
    if (
      params.slidesPerView === 'auto' &&
      params.slidesPerGroup === 1 &&
      params.slidesPerGroupAuto
    ) {
      prevIndex = prevIndex - carousel.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && carousel.isBeginning) {
    const lastIndex =
      carousel.params.virtual && carousel.params.virtual.enabled && carousel.virtual
        ? carousel.virtual.slides.length - 1
        : carousel.slides.length - 1;
    return carousel.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return carousel.slideTo(prevIndex, speed, runCallbacks, internal);
}
