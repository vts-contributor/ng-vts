//@ts-nocheck
import { animateCSSModeScroll } from '../../shared/utils';

export default function slideTo(
  index = 0,
  speed = this.params.speed,
  runCallbacks = true,
  internal,
  initial
) {
  if (typeof index !== 'number' && typeof index !== 'string') {
    throw new Error(
      `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`
    );
  }

  if (typeof index === 'string') {
    /**
     * The `index` argument converted from `string` to `number`.
     * @type {number}
     */
    const indexAsNumber = parseInt(index, 10);

    /**
     * Determines whether the `index` argument is a valid `number`
     * after being converted from the `string` type.
     * @type {boolean}
     */
    const isValidNumber = isFinite(indexAsNumber);

    if (!isValidNumber) {
      throw new Error(
        `The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`
      );
    }

    // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.
    index = indexAsNumber;
  }

  const carousel = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;

  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = carousel;

  if (
    (carousel.animating && params.preventInteractionOnTransition) ||
    (!enabled && !internal && !initial)
  ) {
    return false;
  }

  const skip = Math.min(carousel.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / carousel.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

  const translate = -snapGrid[snapIndex];

  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (
          normalizedTranslate >= normalizedGrid &&
          normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2
        ) {
          slideIndex = i;
        } else if (
          normalizedTranslate >= normalizedGrid &&
          normalizedTranslate < normalizedGridNext
        ) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (carousel.initialized && slideIndex !== activeIndex) {
    if (
      !carousel.allowSlideNext &&
      translate < carousel.translate &&
      translate < carousel.minTranslate()
    ) {
      return false;
    }
    if (
      !carousel.allowSlidePrev &&
      translate > carousel.translate &&
      translate > carousel.maxTranslate()
    ) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }
  }

  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    carousel.emit('beforeSlideChangeStart');
  }

  // Update progress
  carousel.updateProgress(translate);

  let direction;
  if (slideIndex > activeIndex) direction = 'next';
  else if (slideIndex < activeIndex) direction = 'prev';
  else direction = 'reset';

  // Update Index
  if ((rtl && -translate === carousel.translate) || (!rtl && translate === carousel.translate)) {
    carousel.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      carousel.updateAutoHeight();
    }
    carousel.updateSlidesClasses();
    if (params.effect !== 'slide') {
      carousel.setTranslate(translate);
    }
    if (direction !== 'reset') {
      carousel.transitionStart(runCallbacks, direction);
      carousel.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = carousel.isHorizontal();
    const t = rtl ? translate : -translate;
    if (speed === 0) {
      const isVirtual = carousel.virtual && carousel.params.virtual.enabled;
      if (isVirtual) {
        carousel.wrapperEl.style.scrollSnapType = 'none';
        carousel._immediateVirtual = true;
      }
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      if (isVirtual) {
        requestAnimationFrame(() => {
          carousel.wrapperEl.style.scrollSnapType = '';
          carousel._carouselImmediateVirtual = false;
        });
      }
    } else {
      if (!carousel.support.smoothScroll) {
        animateCSSModeScroll({ carousel, targetPosition: t, side: isH ? 'left' : 'top' });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth'
      });
    }
    return true;
  }

  carousel.setTransition(speed);
  carousel.setTranslate(translate);
  carousel.updateActiveIndex(slideIndex);
  carousel.updateSlidesClasses();
  carousel.emit('beforeTransitionStart', speed, internal);
  carousel.transitionStart(runCallbacks, direction);

  if (speed === 0) {
    carousel.transitionEnd(runCallbacks, direction);
  } else if (!carousel.animating) {
    carousel.animating = true;
    if (!carousel.onSlideToWrapperTransitionEnd) {
      carousel.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!carousel || carousel.destroyed) return;
        if (e.target !== this) return;
        carousel.$wrapperEl[0].removeEventListener(
          'transitionend',
          carousel.onSlideToWrapperTransitionEnd
        );
        carousel.$wrapperEl[0].removeEventListener(
          'webkitTransitionEnd',
          carousel.onSlideToWrapperTransitionEnd
        );
        carousel.onSlideToWrapperTransitionEnd = null;
        delete carousel.onSlideToWrapperTransitionEnd;
        carousel.transitionEnd(runCallbacks, direction);
      };
    }
    carousel.$wrapperEl[0].addEventListener(
      'transitionend',
      carousel.onSlideToWrapperTransitionEnd
    );
    carousel.$wrapperEl[0].addEventListener(
      'webkitTransitionEnd',
      carousel.onSlideToWrapperTransitionEnd
    );
  }

  return true;
}
