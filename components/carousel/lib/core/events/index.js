import { getDocument } from 'ssr-window';

import onTouchStart from './onTouchStart.js';
import onTouchMove from './onTouchMove.js';
import onTouchEnd from './onTouchEnd.js';
import onResize from './onResize.js';
import onClick from './onClick.js';
import onScroll from './onScroll.js';

let dummyEventAttached = false;
function dummyEventListener() {}

const events = (Carousel, method) => {
  const document = getDocument();
  const { params, touchEvents, el, wrapperEl, device, support } = Carousel;
  const capture = !!params.nested;
  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  const CarouselMethod = method;

  // Touch Events
  if (!support.touch) {
    el[domMethod](touchEvents.start, Carousel.onTouchStart, false);
    document[domMethod](touchEvents.move, Carousel.onTouchMove, capture);
    document[domMethod](touchEvents.end, Carousel.onTouchEnd, false);
  } else {
    const passiveListener =
      touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners
        ? { passive: true, capture: false }
        : false;
    el[domMethod](touchEvents.start, Carousel.onTouchStart, passiveListener);
    el[domMethod](
      touchEvents.move,
      Carousel.onTouchMove,
      support.passiveListener ? { passive: false, capture } : capture,
    );
    el[domMethod](touchEvents.end, Carousel.onTouchEnd, passiveListener);
    if (touchEvents.cancel) {
      el[domMethod](touchEvents.cancel, Carousel.onTouchEnd, passiveListener);
    }
  }
  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', Carousel.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', Carousel.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    Carousel[CarouselMethod](
      device.ios || device.android
        ? 'resize orientationchange observerUpdate'
        : 'resize observerUpdate',
      onResize,
      true,
    );
  } else {
    Carousel[CarouselMethod]('observerUpdate', onResize, true);
  }
};

function attachEvents() {
  const Carousel = this;
  const document = getDocument();
  const { params, support } = Carousel;

  Carousel.onTouchStart = onTouchStart.bind(Carousel);
  Carousel.onTouchMove = onTouchMove.bind(Carousel);
  Carousel.onTouchEnd = onTouchEnd.bind(Carousel);

  if (params.cssMode) {
    Carousel.onScroll = onScroll.bind(Carousel);
  }

  Carousel.onClick = onClick.bind(Carousel);

  if (support.touch && !dummyEventAttached) {
    document.addEventListener('touchstart', dummyEventListener);
    dummyEventAttached = true;
  }

  events(Carousel, 'on');
}

function detachEvents() {
  const Carousel = this;
  events(Carousel, 'off');
}

export default {
  attachEvents,
  detachEvents,
};
