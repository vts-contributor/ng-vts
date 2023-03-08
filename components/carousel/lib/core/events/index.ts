//@ts-nocheck
import { getDocument } from 'ssr-window';

import onTouchStart from './onTouchStart';
import onTouchMove from './onTouchMove';
import onTouchEnd from './onTouchEnd';
import onResize from './onResize';
import onClick from './onClick';
import onScroll from './onScroll';

let dummyEventAttached = false;
function dummyEventListener() {}

const events = (carousel, method) => {
  const document = getDocument();
  const { params, touchEvents, el, wrapperEl, device, support } = carousel;
  const capture = !!params.nested;
  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  const carouselMethod = method;

  // Touch Events
  if (!support.touch) {
    el[domMethod](touchEvents.start, carousel.onTouchStart, false);
    document[domMethod](touchEvents.move, carousel.onTouchMove, capture);
    document[domMethod](touchEvents.end, carousel.onTouchEnd, false);
  } else {
    const passiveListener =
      touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners
        ? { passive: true, capture: false }
        : false;
    el[domMethod](touchEvents.start, carousel.onTouchStart, passiveListener);
    el[domMethod](
      touchEvents.move,
      carousel.onTouchMove,
      support.passiveListener ? { passive: false, capture } : capture
    );
    el[domMethod](touchEvents.end, carousel.onTouchEnd, passiveListener);
    if (touchEvents.cancel) {
      el[domMethod](touchEvents.cancel, carousel.onTouchEnd, passiveListener);
    }
  }
  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', carousel.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', carousel.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    carousel[carouselMethod](
      device.ios || device.android
        ? 'resize orientationchange observerUpdate'
        : 'resize observerUpdate',
      onResize,
      true
    );
  } else {
    carousel[carouselMethod]('observerUpdate', onResize, true);
  }
};

function attachEvents() {
  const carousel = this;
  const document = getDocument();
  const { params, support } = carousel;

  carousel.onTouchStart = onTouchStart.bind(carousel);
  carousel.onTouchMove = onTouchMove.bind(carousel);
  carousel.onTouchEnd = onTouchEnd.bind(carousel);

  if (params.cssMode) {
    carousel.onScroll = onScroll.bind(carousel);
  }

  carousel.onClick = onClick.bind(carousel);

  if (support.touch && !dummyEventAttached) {
    document.addEventListener('touchstart', dummyEventListener);
    dummyEventAttached = true;
  }

  events(carousel, 'on');
}

function detachEvents() {
  const carousel = this;
  events(carousel, 'off');
}

export default {
  attachEvents,
  detachEvents
};
