import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom.js';
import { now } from '../../shared/utils.js';

// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}

export default function onTouchStart(event) {
  const carousel = this;
  const document = getDocument();
  const window = getWindow();

  const data = carousel.touchEventsData;
  const { params, touches, enabled } = carousel;
  if (!enabled) return;

  if (carousel.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!carousel.animating && params.cssMode && params.vtsLoop) {
    carousel.loopFix();
  }
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  let $targetEl = $(e.target);

  if (params.touchEventsTarget === 'wrapper') {
    if (!$targetEl.closest(carousel.wrapperEl).length) return;
  }
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  const eventPath = event.composedPath ? event.composedPath() : event.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    $targetEl = $(eventPath[0]);
  }

  const noSwipingSelector = params.noSwipingSelector
    ? params.noSwipingSelector
    : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (
    params.noSwiping &&
    (isTargetShadow
      ? closestElement(noSwipingSelector, $targetEl[0])
      : $targetEl.closest(noSwipingSelector)[0])
  ) {
    carousel.allowClick = true;
    return;
  }

  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0]) return;
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  const vtsEdgeSwipeDetection = params.vtsEdgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const vtsEdgeSwipeThreshold = params.vtsEdgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (
    vtsEdgeSwipeDetection &&
    (startX <= vtsEdgeSwipeThreshold || startX >= window.innerWidth - vtsEdgeSwipeThreshold)
  ) {
    if (vtsEdgeSwipeDetection === 'prevent') {
      event.preventDefault();
    } else {
      return;
    }
  }

  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined,
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  carousel.allowClick = true;
  carousel.updateSize();
  carousel.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  if (e.type !== 'touchstart') {
    let preventDefault = true;
    if ($targetEl.is(data.focusableElements)) {
      preventDefault = false;
      if ($targetEl[0].nodeName === 'SELECT') {
        data.isTouched = false;
      }
    }
    if (
      document.activeElement &&
      $(document.activeElement).is(data.focusableElements) &&
      document.activeElement !== $targetEl[0]
    ) {
      document.activeElement.blur();
    }

    const shouldPreventDefault =
      preventDefault && carousel.allowTouchMove && params.touchStartPreventDefault;
    if (
      (params.touchStartForcePreventDefault || shouldPreventDefault) &&
      !$targetEl[0].isContentEditable
    ) {
      e.preventDefault();
    }
  }
  if (
    carousel.params.freeMode &&
    carousel.params.freeMode.enabled &&
    carousel.freeMode &&
    carousel.animating &&
    !params.cssMode
  ) {
    carousel.freeMode.onTouchStart();
  }
  carousel.emit('touchStart', e);
}
