import { now, nextTick } from '../../shared/utils.js';

export default function onTouchEnd(event) {
  const Carousel = this;
  const data = Carousel.touchEventsData;

  const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = Carousel;
  if (!enabled) return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    Carousel.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      Carousel.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  // Return Grab Cursor
  if (
    params.grabCursor &&
    data.isMoved &&
    data.isTouched &&
    (Carousel.allowSlideNext === true || Carousel.allowSlidePrev === true)
  ) {
    Carousel.setGrabCursor(false);
  }

  // Time diff
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (Carousel.allowClick) {
    const pathTree = e.path || (e.composedPath && e.composedPath());
    Carousel.updateClickedSlide((pathTree && pathTree[0]) || e.target);
    Carousel.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      Carousel.emit('doubleTap doubleClick', e);
    }
  }

  data.lastClickTime = now();
  nextTick(() => {
    if (!Carousel.destroyed) Carousel.allowClick = true;
  });

  if (
    !data.isTouched ||
    !data.isMoved ||
    !Carousel.swipeDirection ||
    touches.diff === 0 ||
    data.currentTranslate === data.startTranslate
  ) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;

  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? Carousel.translate : -Carousel.translate;
  } else {
    currentPos = -data.currentTranslate;
  }

  if (params.cssMode) {
    return;
  }

  if (Carousel.params.freeMode && params.freeMode.enabled) {
    Carousel.freeMode.onTouchEnd({ currentPos });
    return;
  }

  // Find current slide
  let stopIndex = 0;
  let groupSize = Carousel.slidesSizesGrid[0];
  for (
    let i = 0;
    i < slidesGrid.length;
    i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup
  ) {
    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }

  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (Carousel.isBeginning) {
      rewindLastIndex =
        Carousel.params.virtual && Carousel.params.virtual.enabled && Carousel.virtual
          ? Carousel.virtual.slides.length - 1
          : Carousel.slides.length - 1;
    } else if (Carousel.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      Carousel.slideTo(Carousel.activeIndex);
      return;
    }
    if (Carousel.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio)
        Carousel.slideTo(params.rewind && Carousel.isEnd ? rewindFirstIndex : stopIndex + increment);
      else Carousel.slideTo(stopIndex);
    }
    if (Carousel.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        Carousel.slideTo(stopIndex + increment);
      } else if (
        rewindLastIndex !== null &&
        ratio < 0 &&
        Math.abs(ratio) > params.longSwipesRatio
      ) {
        Carousel.slideTo(rewindLastIndex);
      } else {
        Carousel.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      Carousel.slideTo(Carousel.activeIndex);
      return;
    }
    const isNavButtonTarget =
      Carousel.navigation &&
      (e.target === Carousel.navigation.nextEl || e.target === Carousel.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (Carousel.swipeDirection === 'next') {
        Carousel.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (Carousel.swipeDirection === 'prev') {
        Carousel.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === Carousel.navigation.nextEl) {
      Carousel.slideTo(stopIndex + increment);
    } else {
      Carousel.slideTo(stopIndex);
    }
  }
}
