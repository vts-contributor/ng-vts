//@ts-nocheck
export default function setTransition(duration, byController) {
  const carousel = this;

  if (!carousel.params.cssMode) {
    carousel.$wrapperEl.transition(duration);
  }

  carousel.emit('setTransition', duration, byController);
}
