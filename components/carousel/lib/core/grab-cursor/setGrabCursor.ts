//@ts-nocheck
export default function setGrabCursor(moving) {
  const carousel = this;
  if (
    carousel.support.touch ||
    !carousel.params.simulateTouch ||
    (carousel.params.watchOverflow && carousel.isLocked) ||
    carousel.params.cssMode
  )
    return;
  const el = carousel.params.touchEventsTarget === 'container' ? carousel.el : carousel.wrapperEl;
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
}
