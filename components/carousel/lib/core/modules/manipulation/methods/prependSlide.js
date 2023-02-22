export default function prependSlide(slides) {
  const Carousel = this;
  const { params, $wrapperEl, activeIndex } = Carousel;

  if (params.loop) {
    Carousel.loopDestroy();
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
    Carousel.loopCreate();
  }
  if (!params.observer) {
    Carousel.update();
  }
  Carousel.slideTo(newActiveIndex, 0, false);
}
