//@ts-nocheck
/* eslint no-unused-vars: "off" */
export default function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const carousel = this;
  return carousel.slideTo(carousel.activeIndex, speed, runCallbacks, internal);
}
