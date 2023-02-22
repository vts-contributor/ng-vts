export default function onClick(e) {
  const Carousel = this;
  if (!Carousel.enabled) return;
  if (!Carousel.allowClick) {
    if (Carousel.params.preventClicks) e.preventDefault();
    if (Carousel.params.preventClicksPropagation && Carousel.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
