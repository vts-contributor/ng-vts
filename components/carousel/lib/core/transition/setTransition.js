export default function setTransition(duration, byController) {
  const Carousel = this;

  if (!Carousel.params.cssMode) {
    Carousel.$wrapperEl.transition(duration);
  }

  Carousel.emit('setTransition', duration, byController);
}
