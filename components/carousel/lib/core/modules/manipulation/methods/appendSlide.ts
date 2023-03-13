//@ts-nocheck
export default function appendSlide(slides) {
  const carousel = this;
  const { $wrapperEl, params } = carousel;
  if (params.loop) {
    carousel.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.append(slides[i]);
    }
  } else {
    $wrapperEl.append(slides);
  }
  if (params.loop) {
    carousel.loopCreate();
  }
  if (!params.observer) {
    carousel.update();
  }
}
