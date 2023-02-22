/* eslint no-unused-vars: "off" */
export default function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const Carousel = this;
  const { animating, enabled, params } = Carousel;
  if (!enabled) return Carousel;
  let perGroup = params.slidesPerGroup;
  if (params.vtsSlidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(Carousel.slidesPerViewDynamic('current', true), 1);
  }
  const increment = Carousel.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    Carousel.loopFix();
    // eslint-disable-next-line
    Carousel._clientLeft = Carousel.$wrapperEl[0].clientLeft;
  }
  if (params.rewind && Carousel.isEnd) {
    return Carousel.slideTo(0, speed, runCallbacks, internal);
  }
  return Carousel.slideTo(Carousel.activeIndex + increment, speed, runCallbacks, internal);
}
