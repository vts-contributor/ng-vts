//@ts-nocheck
import { animateCSSModeScroll } from '../../shared/utils';

export default function translateTo(
  translate = 0,
  speed = this.params.speed,
  runCallbacks = true,
  translateBounds = true,
  internal
) {
  const carousel = this;

  const { params, wrapperEl } = carousel;

  if (carousel.animating && params.preventInteractionOnTransition) {
    return false;
  }

  const minTranslate = carousel.minTranslate();
  const maxTranslate = carousel.maxTranslate();
  let newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
  else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
  else newTranslate = translate;

  // Update progress
  carousel.updateProgress(newTranslate);

  if (params.cssMode) {
    const isH = carousel.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      if (!carousel.support.smoothScroll) {
        animateCSSModeScroll({
          carousel,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth'
      });
    }
    return true;
  }

  if (speed === 0) {
    carousel.setTransition(0);
    carousel.setTranslate(newTranslate);
    if (runCallbacks) {
      carousel.emit('beforeTransitionStart', speed, internal);
      carousel.emit('transitionEnd');
    }
  } else {
    carousel.setTransition(speed);
    carousel.setTranslate(newTranslate);
    if (runCallbacks) {
      carousel.emit('beforeTransitionStart', speed, internal);
      carousel.emit('transitionStart');
    }
    if (!carousel.animating) {
      carousel.animating = true;
      if (!carousel.onTranslateToWrapperTransitionEnd) {
        carousel.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!carousel || carousel.destroyed) return;
          if (e.target !== this) return;
          carousel.$wrapperEl[0].removeEventListener(
            'transitionend',
            carousel.onTranslateToWrapperTransitionEnd
          );
          carousel.$wrapperEl[0].removeEventListener(
            'webkitTransitionEnd',
            carousel.onTranslateToWrapperTransitionEnd
          );
          carousel.onTranslateToWrapperTransitionEnd = null;
          delete carousel.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            carousel.emit('transitionEnd');
          }
        };
      }
      carousel.$wrapperEl[0].addEventListener(
        'transitionend',
        carousel.onTranslateToWrapperTransitionEnd
      );
      carousel.$wrapperEl[0].addEventListener(
        'webkitTransitionEnd',
        carousel.onTranslateToWrapperTransitionEnd
      );
    }
  }

  return true;
}
