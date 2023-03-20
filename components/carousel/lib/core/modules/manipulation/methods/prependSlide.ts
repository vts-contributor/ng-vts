//@ts-nocheck
export default function prependSlide(slides) {
  const carousel = this;
  const { params, $wrapperEl, activeIndex } = carousel;

  if (params.loop) {
    carousel.loopDestroy();
  }
  let newActiveIndex = activeIndex + 1;
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.prepend(slides[i]);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }
  if (params.loop) {
    carousel.loopCreate();
  }
  if (!params.observer) {
    carousel.update();
  }
  carousel.slideTo(newActiveIndex, 0, false);
}
