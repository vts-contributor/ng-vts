//@ts-nocheck
/* eslint no-unused-vars: "off" */
export default function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const carousel = this;
  const { animating, enabled, params } = carousel;
  if (!enabled) return carousel;
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(carousel.slidesPerViewDynamic('current', true), 1);
  }
  const increment = carousel.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    carousel.loopFix();
    // eslint-disable-next-line
    carousel._clientLeft = carousel.$wrapperEl[0].clientLeft;
  }
  if (params.rewind && carousel.isEnd) {
    return carousel.slideTo(0, speed, runCallbacks, internal);
  }
  return carousel.slideTo(carousel.activeIndex + increment, speed, runCallbacks, internal);
}
