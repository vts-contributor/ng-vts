//@ts-nocheck
import transitionEmit from './transitionEmit';

export default function transitionStart(runCallbacks = true, direction) {
  const carousel = this;
  const { params } = carousel;
  if (params.cssMode) return;
  if (params.autoHeight) {
    carousel.updateAutoHeight();
  }

  transitionEmit({ carousel, runCallbacks, direction, step: 'Start' });
}
