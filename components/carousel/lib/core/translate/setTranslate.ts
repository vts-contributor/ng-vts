//@ts-nocheck
export default function setTranslate(translate, byController) {
  const carousel = this;
  const { rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress } = carousel;
  let x = 0;
  let y = 0;
  const z = 0;

  if (carousel.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (params.cssMode) {
    wrapperEl[carousel.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = carousel.isHorizontal()
      ? -x
      : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
  }
  carousel.previousTranslate = carousel.translate;
  carousel.translate = carousel.isHorizontal() ? x : y;

  // Check if we need to update progress
  let newProgress;
  const translatesDiff = carousel.maxTranslate() - carousel.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - carousel.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    carousel.updateProgress(translate);
  }

  carousel.emit('setTranslate', carousel.translate, byController);
}
