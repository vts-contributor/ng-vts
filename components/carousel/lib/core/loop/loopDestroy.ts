//@ts-nocheck
export default function loopDestroy() {
  const carousel = this;
  const { $wrapperEl, params, slides } = carousel;
  $wrapperEl
    .children(
      `.${params.vtsSlideClass}.${params.vtsSlideDuplicateClass},.${params.vtsSlideClass}.${params.slideBlankClass}`
    )
    .remove();
  slides.removeAttr('data-carousel-slide-index');
}
