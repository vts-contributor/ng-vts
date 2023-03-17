//@ts-nocheck
export default function loopDestroy() {
  const carousel = this;
  const { $wrapperEl, params, slides } = carousel;
  $wrapperEl
    .children(
      `.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`
    )
    .remove();
  slides.removeAttr('data-carousel-slide-index');
}
