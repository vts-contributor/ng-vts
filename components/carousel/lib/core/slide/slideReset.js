/* eslint no-unused-vars: "off" */
export default function slideReset(vtsSpeed = this.params.vtsSpeed, runCallbacks = true, internal) {
  const carousel = this;
  return carousel.slideTo(carousel.activeIndex, vtsSpeed, runCallbacks, internal);
}
