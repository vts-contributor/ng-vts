export default function updateProgress(translate) {
  const Carousel = this;
  if (typeof translate === 'undefined') {
    const multiplier = Carousel.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = (Carousel && Carousel.translate && Carousel.translate * multiplier) || 0;
  }
  const params = Carousel.params;
  const translatesDiff = Carousel.maxTranslate() - Carousel.minTranslate();
  let { progress, isBeginning, isEnd } = Carousel;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - Carousel.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Object.assign(Carousel, {
    progress,
    isBeginning,
    isEnd,
  });

  if (params.watchSlidesProgress || (params.centeredSlides && params.autoHeight))
    Carousel.updateSlidesProgress(translate);

  if (isBeginning && !wasBeginning) {
    Carousel.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    Carousel.emit('reachEnd toEdge');
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    Carousel.emit('fromEdge');
  }

  Carousel.emit('progress', progress);
}
