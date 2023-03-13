//@ts-nocheck
/* eslint no-unused-vars: "off" */
export default function slideToClosest(
  speed = this.params.speed,
  runCallbacks = true,
  internal,
  threshold = 0.5
) {
  const carousel = this;
  let index = carousel.activeIndex;
  const skip = Math.min(carousel.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / carousel.params.slidesPerGroup);

  const translate = carousel.rtlTranslate ? carousel.translate : -carousel.translate;

  if (translate >= carousel.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    const currentSnap = carousel.snapGrid[snapIndex];
    const nextSnap = carousel.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += carousel.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    const prevSnap = carousel.snapGrid[snapIndex - 1];
    const currentSnap = carousel.snapGrid[snapIndex];
    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= carousel.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, carousel.slidesGrid.length - 1);

  return carousel.slideTo(index, speed, runCallbacks, internal);
}
