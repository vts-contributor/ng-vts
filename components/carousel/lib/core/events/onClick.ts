//@ts-nocheck
export default function onClick(e) {
  const carousel = this;
  if (!carousel.enabled) return;
  if (!carousel.allowClick) {
    if (carousel.params.preventClicks) e.preventDefault();
    if (carousel.params.preventClicksPropagation && carousel.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
