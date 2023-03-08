//@ts-nocheck
export default function unsetGrabCursor() {
  const carousel = this;
  if (
    carousel.support.touch ||
    (carousel.params.watchOverflow && carousel.isLocked) ||
    carousel.params.cssMode
  ) {
    return;
  }
  carousel[carousel.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor =
    '';
}
