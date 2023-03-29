//@ts-nocheck
export default function updateProgress(translate) {
  const carousel = this;
  if (typeof translate === 'undefined') {
    const multiplier = carousel.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = (carousel && carousel.translate && carousel.translate * multiplier) || 0;
  }
  const params = carousel.params;
  const translatesDiff = carousel.maxTranslate() - carousel.minTranslate();
  let { progress, isBeginning, isEnd } = carousel;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (params.loop) {
    isBeginning = false;
    isEnd = false;
  } else if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - carousel.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Object.assign(carousel, {
    progress,
    isBeginning,
    isEnd
  });

  if (params.watchSlidesProgress || (params.centeredSlides && params.autoHeight))
    carousel.updateSlidesProgress(translate);

  if (isBeginning && !wasBeginning) {
    carousel.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    carousel.emit('reachEnd toEdge');
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    carousel.emit('fromEdge');
  }

  carousel.emit('progress', progress);
}
