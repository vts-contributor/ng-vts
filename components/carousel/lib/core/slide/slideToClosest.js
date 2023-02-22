/* eslint no-unused-vars: "off" */
export default function slideToClosest(
  speed = this.params.speed,
  runCallbacks = true,
  internal,
  threshold = 0.5,
) {
  const Carousel = this;
  let index = Carousel.activeIndex;
  const skip = Math.min(Carousel.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / Carousel.params.slidesPerGroup);

  const translate = Carousel.rtlTranslate ? Carousel.translate : -Carousel.translate;

  if (translate >= Carousel.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    const currentSnap = Carousel.snapGrid[snapIndex];
    const nextSnap = Carousel.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += Carousel.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    const prevSnap = Carousel.snapGrid[snapIndex - 1];
    const currentSnap = Carousel.snapGrid[snapIndex];
    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= Carousel.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, Carousel.slidesGrid.length - 1);

  return Carousel.slideTo(index, speed, runCallbacks, internal);
}
