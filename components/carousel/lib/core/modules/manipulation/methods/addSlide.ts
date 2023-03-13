//@ts-nocheck
export default function addSlide(index, slides) {
  const carousel = this;
  const { $wrapperEl, params, activeIndex } = carousel;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= carousel.loopedSlides;
    carousel.loopDestroy();
    carousel.slides = $wrapperEl.children(`.${params.slideClass}`);
  }
  const baseLength = carousel.slides.length;
  if (index <= 0) {
    carousel.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    carousel.appendSlide(slides);
    return;
  }
  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

  const slidesBuffer = [];
  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = carousel.slides.eq(i);
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
    carousel.loopCreate();
  }
  if (!params.observer) {
    carousel.update();
  }
  if (params.loop) {
    carousel.slideTo(newActiveIndex + carousel.loopedSlides, 0, false);
  } else {
    carousel.slideTo(newActiveIndex, 0, false);
  }
}
