//@ts-nocheck
import transitionEmit from './transitionEmit';

export default function transitionEnd(runCallbacks = true, direction) {
  const carousel = this;
  const { params } = carousel;
  carousel.animating = false;
  if (params.cssMode) return;
  carousel.setTransition(0);

  transitionEmit({ carousel, runCallbacks, direction, step: 'End' });
}
