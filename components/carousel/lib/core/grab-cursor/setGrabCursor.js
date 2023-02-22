export default function setGrabCursor(moving) {
  const Carousel = this;
  if (
    Carousel.support.touch ||
    !Carousel.params.simulateTouch ||
    (Carousel.params.watchOverflow && Carousel.isLocked) ||
    Carousel.params.cssMode
  )
    return;
  const el = Carousel.params.touchEventsTarget === 'container' ? Carousel.el : Carousel.wrapperEl;
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
}
