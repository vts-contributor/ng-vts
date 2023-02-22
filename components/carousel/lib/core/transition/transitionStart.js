import transitionEmit from './transitionEmit.js';

export default function transitionStart(runCallbacks = true, direction) {
  const Carousel = this;
  const { params } = Carousel;
  if (params.cssMode) return;
  if (params.autoHeight) {
    Carousel.updateAutoHeight();
  }

  transitionEmit({ Carousel, runCallbacks, direction, step: 'Start' });
}
