//@ts-nocheck
import { getDocument } from 'ssr-window';
import $ from '../../shared/dom';
import { now } from '../../shared/utils';

export default function onTouchMove(event) {
  const document = getDocument();
  const carousel = this;
  const data = carousel.touchEventsData;
  const { params, touches, rtlTranslate: rtl, enabled } = carousel;
  if (!enabled) return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      carousel.emit('touchMoveOpposite', e);
    }
    return;
  }
  if (data.isTouchEvent && e.type !== 'touchmove') return;
  const targetTouch =
    e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
  const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
  const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;
  if (e.preventedByNestedcarousel) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!carousel.allowTouchMove) {
    if (!$(e.target).is(data.focusableElements)) {
      carousel.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (carousel.isVertical()) {
      // Vertical
      if (
        (pageY < touches.startY && carousel.translate <= carousel.maxTranslate()) ||
        (pageY > touches.startY && carousel.translate >= carousel.minTranslate())
      ) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (
      (pageX < touches.startX && carousel.translate <= carousel.maxTranslate()) ||
      (pageX > touches.startX && carousel.translate >= carousel.minTranslate())
    ) {
      return;
    }
  }
  if (data.isTouchEvent && document.activeElement) {
    if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
      data.isMoved = true;
      carousel.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    carousel.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) return;

  touches.currentX = pageX;
  touches.currentY = pageY;

  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (carousel.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < carousel.params.threshold)
    return;

  if (typeof data.isScrolling === 'undefined') {
    let touchAngle;
    if (
      (carousel.isHorizontal() && touches.currentY === touches.startY) ||
      (carousel.isVertical() && touches.currentX === touches.startX)
    ) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = carousel.isHorizontal()
          ? touchAngle > params.touchAngle
          : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    carousel.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  carousel.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  if (!data.isMoved) {
    if (params.loop && !params.cssMode) {
      carousel.loopFix();
    }
    data.startTranslate = carousel.getTranslate();
    carousel.setTransition(0);
    if (carousel.animating) {
      carousel.$wrapperEl.trigger('webkitTransitionEnd transitionend');
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (
      params.grabCursor &&
      (carousel.allowSlideNext === true || carousel.allowSlidePrev === true)
    ) {
      carousel.setGrabCursor(true);
    }
    carousel.emit('sliderFirstMove', e);
  }
  carousel.emit('sliderMove', e);
  data.isMoved = true;

  let diff = carousel.isHorizontal() ? diffX : diffY;
  touches.diff = diff;

  diff *= params.touchRatio;
  if (rtl) diff = -diff;

  carousel.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;

  let disableParentcarousel = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0 && data.currentTranslate > carousel.minTranslate()) {
    disableParentcarousel = false;
    if (params.resistance)
      data.currentTranslate =
        carousel.minTranslate() -
        1 +
        (-carousel.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
  } else if (diff < 0 && data.currentTranslate < carousel.maxTranslate()) {
    disableParentcarousel = false;
    if (params.resistance)
      data.currentTranslate =
        carousel.maxTranslate() +
        1 -
        (carousel.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
  }

  if (disableParentcarousel) {
    e.preventedByNestedcarousel = true;
  }

  // Directions locks
  if (
    !carousel.allowSlideNext &&
    carousel.swipeDirection === 'next' &&
    data.currentTranslate < data.startTranslate
  ) {
    data.currentTranslate = data.startTranslate;
  }
  if (
    !carousel.allowSlidePrev &&
    carousel.swipeDirection === 'prev' &&
    data.currentTranslate > data.startTranslate
  ) {
    data.currentTranslate = data.startTranslate;
  }
  if (!carousel.allowSlidePrev && !carousel.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = carousel.isHorizontal()
          ? touches.currentX - touches.startX
          : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (
    (params.freeMode && params.freeMode.enabled && carousel.freeMode) ||
    params.watchSlidesProgress
  ) {
    carousel.updateActiveIndex();
    carousel.updateSlidesClasses();
  }
  if (carousel.params.freeMode && params.freeMode.enabled && carousel.freeMode) {
    carousel.freeMode.onTouchMove();
  }
  // Update progress
  carousel.updateProgress(data.currentTranslate);
  // Update translate
  carousel.setTranslate(data.currentTranslate);
}
