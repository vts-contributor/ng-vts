export default function loopDestroy() {
  const Carousel = this;
  const { $wrapperEl, params, slides } = Carousel;
  $wrapperEl
    .children(
      `.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`,
    )
    .remove();
  slides.removeAttr('data-Carousel-slide-index');
}
