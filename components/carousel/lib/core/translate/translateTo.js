import { animateCSSModeScroll } from '../../shared/utils.js';

export default function translateTo(
  translate = 0,
  speed = this.params.speed,
  runCallbacks = true,
  translateBounds = true,
  internal,
) {
  const Carousel = this;

  const { params, wrapperEl } = Carousel;

  if (Carousel.animating && params.preventInteractionOnTransition) {
    return false;
  }

  const minTranslate = Carousel.minTranslate();
  const maxTranslate = Carousel.maxTranslate();
  let newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
  else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
  else newTranslate = translate;

  // Update progress
  Carousel.updateProgress(newTranslate);

  if (params.cssMode) {
    const isH = Carousel.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      if (!Carousel.support.smoothScroll) {
        animateCSSModeScroll({ Carousel, targetPosition: -newTranslate, side: isH ? 'left' : 'top' });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth',
      });
    }
    return true;
  }

  if (speed === 0) {
    Carousel.setTransition(0);
    Carousel.setTranslate(newTranslate);
    if (runCallbacks) {
      Carousel.emit('beforeTransitionStart', speed, internal);
      Carousel.emit('transitionEnd');
    }
  } else {
    Carousel.setTransition(speed);
    Carousel.setTranslate(newTranslate);
    if (runCallbacks) {
      Carousel.emit('beforeTransitionStart', speed, internal);
      Carousel.emit('transitionStart');
    }
    if (!Carousel.animating) {
      Carousel.animating = true;
      if (!Carousel.onTranslateToWrapperTransitionEnd) {
        Carousel.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!Carousel || Carousel.destroyed) return;
          if (e.target !== this) return;
          Carousel.$wrapperEl[0].removeEventListener(
            'transitionend',
            Carousel.onTranslateToWrapperTransitionEnd,
          );
          Carousel.$wrapperEl[0].removeEventListener(
            'webkitTransitionEnd',
            Carousel.onTranslateToWrapperTransitionEnd,
          );
          Carousel.onTranslateToWrapperTransitionEnd = null;
          delete Carousel.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            Carousel.emit('transitionEnd');
          }
        };
      }
      Carousel.$wrapperEl[0].addEventListener(
        'transitionend',
        Carousel.onTranslateToWrapperTransitionEnd,
      );
      Carousel.$wrapperEl[0].addEventListener(
        'webkitTransitionEnd',
        Carousel.onTranslateToWrapperTransitionEnd,
      );
    }
  }

  return true;
}
