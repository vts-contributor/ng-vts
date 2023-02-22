/* eslint no-unused-vars: "off" */
export default function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const Carousel = this;
  return Carousel.slideTo(Carousel.activeIndex, speed, runCallbacks, internal);
}
