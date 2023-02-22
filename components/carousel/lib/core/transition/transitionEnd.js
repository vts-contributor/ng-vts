import transitionEmit from './transitionEmit.js';

export default function transitionEnd(runCallbacks = true, direction) {
  const Carousel = this;
  const { params } = Carousel;
  Carousel.animating = false;
  if (params.cssMode) return;
  Carousel.setTransition(0);

  transitionEmit({ Carousel, runCallbacks, direction, step: 'End' });
}
