export default function appendSlide(slides) {
  const Carousel = this;
  const { $wrapperEl, params } = Carousel;
  if (params.loop) {
    Carousel.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.append(slides[i]);
    }
  } else {
    $wrapperEl.append(slides);
  }
  if (params.loop) {
    Carousel.loopCreate();
  }
  if (!params.observer) {
    Carousel.update();
  }
}
