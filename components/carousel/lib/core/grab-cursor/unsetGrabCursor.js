export default function unsetGrabCursor() {
  const Carousel = this;
  if (
    Carousel.support.touch ||
    (Carousel.params.watchOverflow && Carousel.isLocked) ||
    Carousel.params.cssMode
  ) {
    return;
  }
  Carousel[Carousel.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
}
