export default function addSlide(index, slides) {
  const Carousel = this;
  const { $wrapperEl, params, activeIndex } = Carousel;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= Carousel.loopedSlides;
    Carousel.loopDestroy();
    Carousel.slides = $wrapperEl.children(`.${params.slideClass}`);
  }
  const baseLength = Carousel.slides.length;
  if (index <= 0) {
    Carousel.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    Carousel.appendSlide(slides);
    return;
  }
  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

  const slidesBuffer = [];
  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = Carousel.slides.eq(i);
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }

  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) $wrapperEl.append(slides[i]);
    }
    newActiveIndex =
      activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    $wrapperEl.append(slides);
  }

  for (let i = 0; i < slidesBuffer.length; i += 1) {
    $wrapperEl.append(slidesBuffer[i]);
  }

  if (params.loop) {
    Carousel.loopCreate();
  }
  if (!params.observer) {
    Carousel.update();
  }
  if (params.loop) {
    Carousel.slideTo(newActiveIndex + Carousel.loopedSlides, 0, false);
  } else {
    Carousel.slideTo(newActiveIndex, 0, false);
  }
}
