//@ts-nocheck
import { now, nextTick } from '../../shared/utils';

export default function onTouchEnd(event) {
  const carousel = this;
  const data = carousel.touchEventsData;

  const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = carousel;
  if (!enabled) return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    carousel.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      carousel.setGrabCursor(false);
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
    (carousel.allowSlideNext === true || carousel.allowSlidePrev === true)
  ) {
    carousel.setGrabCursor(false);
  }

  // Time diff
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (carousel.allowClick) {
    const pathTree = e.path || (e.composedPath && e.composedPath());
    carousel.updateClickedSlide((pathTree && pathTree[0]) || e.target);
    carousel.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      carousel.emit('doubleTap doubleClick', e);
    }
  }

  data.lastClickTime = now();
  nextTick(() => {
    if (!carousel.destroyed) carousel.allowClick = true;
  });

  if (
    !data.isTouched ||
    !data.isMoved ||
    !carousel.swipeDirection ||
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
    currentPos = rtl ? carousel.translate : -carousel.translate;
  } else {
    currentPos = -data.currentTranslate;
  }

  if (params.cssMode) {
    return;
  }

  if (carousel.params.freeMode && params.freeMode.enabled) {
    carousel.freeMode.onTouchEnd({ currentPos });
    return;
  }

  // Find current slide
  let stopIndex = 0;
  let groupSize = carousel.slidesSizesGrid[0];
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
    if (carousel.isBeginning) {
      rewindLastIndex =
        carousel.params.virtual && carousel.params.virtual.enabled && carousel.virtual
          ? carousel.virtual.slides.length - 1
          : carousel.slides.length - 1;
    } else if (carousel.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      carousel.slideTo(carousel.activeIndex);
      return;
    }
    if (carousel.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio)
        carousel.slideTo(
          params.rewind && carousel.isEnd ? rewindFirstIndex : stopIndex + increment
        );
      else carousel.slideTo(stopIndex);
    }
    if (carousel.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        carousel.slideTo(stopIndex + increment);
      } else if (
        rewindLastIndex !== null &&
        ratio < 0 &&
        Math.abs(ratio) > params.longSwipesRatio
      ) {
        carousel.slideTo(rewindLastIndex);
      } else {
        carousel.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      carousel.slideTo(carousel.activeIndex);
      return;
    }
    const isNavButtonTarget =
      carousel.navigation &&
      (e.target === carousel.navigation.nextEl || e.target === carousel.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (carousel.swipeDirection === 'next') {
        carousel.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (carousel.swipeDirection === 'prev') {
        carousel.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === carousel.navigation.nextEl) {
      carousel.slideTo(stopIndex + increment);
    } else {
      carousel.slideTo(stopIndex);
    }
  }
}
