import { animateCSSModeScroll } from '../../shared/utils.js';

export default function slideTo(
  index = 0,
  speed = this.params.speed,
  runCallbacks = true,
  internal,
  initial,
) {
  if (typeof index !== 'number' && typeof index !== 'string') {
    throw new Error(
      `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`,
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
        `The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`,
      );
    }

    // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.
    index = indexAsNumber;
  }

  const Carousel = this;
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
    enabled,
  } = Carousel;

  if (
    (Carousel.animating && params.preventInteractionOnTransition) ||
    (!enabled && !internal && !initial)
  ) {
    return false;
  }

  const skip = Math.min(Carousel.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / Carousel.params.slidesPerGroup);
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
  if (Carousel.initialized && slideIndex !== activeIndex) {
    if (
      !Carousel.allowSlideNext &&
      translate < Carousel.translate &&
      translate < Carousel.minTranslate()
    ) {
      return false;
    }
    if (
      !Carousel.allowSlidePrev &&
      translate > Carousel.translate &&
      translate > Carousel.maxTranslate()
    ) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }
  }

  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    Carousel.emit('beforeSlideChangeStart');
  }

  // Update progress
  Carousel.updateProgress(translate);

  let direction;
  if (slideIndex > activeIndex) direction = 'next';
  else if (slideIndex < activeIndex) direction = 'prev';
  else direction = 'reset';

  // Update Index
  if ((rtl && -translate === Carousel.translate) || (!rtl && translate === Carousel.translate)) {
    Carousel.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      Carousel.updateAutoHeight();
    }
    Carousel.updateSlidesClasses();
    if (params.effect !== 'slide') {
      Carousel.setTranslate(translate);
    }
    if (direction !== 'reset') {
      Carousel.transitionStart(runCallbacks, direction);
      Carousel.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = Carousel.isHorizontal();
    const t = rtl ? translate : -translate;
    if (speed === 0) {
      const isVirtual = Carousel.virtual && Carousel.params.virtual.enabled;
      if (isVirtual) {
        Carousel.wrapperEl.style.scrollSnapType = 'none';
        Carousel._immediateVirtual = true;
      }
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      if (isVirtual) {
        requestAnimationFrame(() => {
          Carousel.wrapperEl.style.scrollSnapType = '';
          Carousel._CarouselImmediateVirtual = false;
        });
      }
    } else {
      if (!Carousel.support.smoothScroll) {
        animateCSSModeScroll({ Carousel, targetPosition: t, side: isH ? 'left' : 'top' });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth',
      });
    }
    return true;
  }

  Carousel.setTransition(speed);
  Carousel.setTranslate(translate);
  Carousel.updateActiveIndex(slideIndex);
  Carousel.updateSlidesClasses();
  Carousel.emit('beforeTransitionStart', speed, internal);
  Carousel.transitionStart(runCallbacks, direction);

  if (speed === 0) {
    Carousel.transitionEnd(runCallbacks, direction);
  } else if (!Carousel.animating) {
    Carousel.animating = true;
    if (!Carousel.onSlideToWrapperTransitionEnd) {
      Carousel.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!Carousel || Carousel.destroyed) return;
        if (e.target !== this) return;
        Carousel.$wrapperEl[0].removeEventListener(
          'transitionend',
          Carousel.onSlideToWrapperTransitionEnd,
        );
        Carousel.$wrapperEl[0].removeEventListener(
          'webkitTransitionEnd',
          Carousel.onSlideToWrapperTransitionEnd,
        );
        Carousel.onSlideToWrapperTransitionEnd = null;
        delete Carousel.onSlideToWrapperTransitionEnd;
        Carousel.transitionEnd(runCallbacks, direction);
      };
    }
    Carousel.$wrapperEl[0].addEventListener('transitionend', Carousel.onSlideToWrapperTransitionEnd);
    Carousel.$wrapperEl[0].addEventListener(
      'webkitTransitionEnd',
      Carousel.onSlideToWrapperTransitionEnd,
    );
  }

  return true;
}
