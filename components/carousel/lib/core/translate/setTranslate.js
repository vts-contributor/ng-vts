export default function setTranslate(translate, byController) {
  const Carousel = this;
  const { rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress } = Carousel;
  let x = 0;
  let y = 0;
  const z = 0;

  if (Carousel.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (params.cssMode) {
    wrapperEl[Carousel.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = Carousel.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
  }
  Carousel.previousTranslate = Carousel.translate;
  Carousel.translate = Carousel.isHorizontal() ? x : y;

  // Check if we need to update progress
  let newProgress;
  const translatesDiff = Carousel.maxTranslate() - Carousel.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - Carousel.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    Carousel.updateProgress(translate);
  }

  Carousel.emit('setTranslate', Carousel.translate, byController);
}
