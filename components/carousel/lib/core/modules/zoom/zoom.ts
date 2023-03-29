//@ts-nocheck
import { getWindow } from 'ssr-window';
import $ from '../../../shared/dom';
import { getTranslate } from '../../../shared/utils';

export default function Zoom({ carousel, extendParams, on, emit }) {
  const window = getWindow();
  extendParams({
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'vts-carousel-zoom-container',
      zoomedSlideClass: 'vts-carousel-slide-zoomed'
    }
  });

  carousel.zoom = {
    enabled: false
  };

  let currentScale = 1;
  let isScaling = false;
  let gesturesEnabled;
  let fakeGestureTouched;
  let fakeGestureMoved;
  const gesture = {
    $slideEl: undefined,
    slideWidth: undefined,
    slideHeight: undefined,
    $imageEl: undefined,
    $imageWrapEl: undefined,
    maxRatio: 3
  };
  const image = {
    isTouched: undefined,
    isMoved: undefined,
    currentX: undefined,
    currentY: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    width: undefined,
    height: undefined,
    startX: undefined,
    startY: undefined,
    touchesStart: {},
    touchesCurrent: {}
  };
  const velocity = {
    x: undefined,
    y: undefined,
    prevPositionX: undefined,
    prevPositionY: undefined,
    prevTime: undefined
  };

  let scale = 1;
  Object.defineProperty(carousel.zoom, 'scale', {
    get() {
      return scale;
    },
    set(value) {
      if (scale !== value) {
        const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
        const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
        emit('zoomChange', value, imageEl, slideEl);
      }
      scale = value;
    }
  });

  function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) return 1;
    const x1 = e.targetTouches[0].pageX;
    const y1 = e.targetTouches[0].pageY;
    const x2 = e.targetTouches[1].pageX;
    const y2 = e.targetTouches[1].pageY;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  }

  // Events
  function onGestureStart(e) {
    const support = carousel.support;
    const params = carousel.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    if (!support.gestures) {
      if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
        return;
      }
      fakeGestureTouched = true;
      gesture.scaleStart = getDistanceBetweenTouches(e);
    }
    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      gesture.$slideEl = $(e.target).closest(`.${carousel.params.slideClass}`);
      if (gesture.$slideEl.length === 0)
        gesture.$slideEl = carousel.slides.eq(carousel.activeIndex);
      gesture.$imageEl = gesture.$slideEl
        .find(`.${params.containerClass}`)
        .eq(0)
        .find('picture, img, svg, canvas, .carousel-zoom-target')
        .eq(0);
      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
      gesture.maxRatio = gesture.$imageWrapEl.attr('data-carousel-zoom') || params.maxRatio;
      if (gesture.$imageWrapEl.length === 0) {
        gesture.$imageEl = undefined;
        return;
      }
    }
    if (gesture.$imageEl) {
      gesture.$imageEl.transition(0);
    }
    isScaling = true;
  }
  function onGestureChange(e) {
    const support = carousel.support;
    const params = carousel.params.zoom;
    const zoom = carousel.zoom;
    if (!support.gestures) {
      if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
        return;
      }
      fakeGestureMoved = true;
      gesture.scaleMove = getDistanceBetweenTouches(e);
    }

    if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
      if (e.type === 'gesturechange') onGestureStart(e);
      return;
    }
    if (support.gestures) {
      zoom.scale = e.scale * currentScale;
    } else {
      zoom.scale = (gesture.scaleMove / gesture.scaleStart) * currentScale;
    }
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
    }
    gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
  }
  function onGestureEnd(e) {
    const device = carousel.device;
    const support = carousel.support;
    const params = carousel.params.zoom;
    const zoom = carousel.zoom;
    if (!support.gestures) {
      if (!fakeGestureTouched || !fakeGestureMoved) {
        return;
      }
      if (
        e.type !== 'touchend' ||
        (e.type === 'touchend' && e.changedTouches.length < 2 && !device.android)
      ) {
        return;
      }
      fakeGestureTouched = false;
      fakeGestureMoved = false;
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl
      .transition(carousel.params.speed)
      .transform(`translate3d(0,0,0) scale(${zoom.scale})`);
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale === 1) gesture.$slideEl = undefined;
  }
  function onTouchStart(e) {
    const device = carousel.device;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  }
  function onTouchMove(e) {
    const zoom = carousel.zoom;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    carousel.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) return;

    if (!image.isMoved) {
      image.width = gesture.$imageEl[0].offsetWidth;
      image.height = gesture.$imageEl[0].offsetHeight;
      image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
      image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
      gesture.$imageWrapEl.transition(0);
    }
    // Define if we need image drag
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;

    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;

    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;

    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !isScaling) {
      if (
        carousel.isHorizontal() &&
        ((Math.floor(image.minX) === Math.floor(image.startX) &&
          image.touchesCurrent.x < image.touchesStart.x) ||
          (Math.floor(image.maxX) === Math.floor(image.startX) &&
            image.touchesCurrent.x > image.touchesStart.x))
      ) {
        image.isTouched = false;
        return;
      }
      if (
        !carousel.isHorizontal() &&
        ((Math.floor(image.minY) === Math.floor(image.startY) &&
          image.touchesCurrent.y < image.touchesStart.y) ||
          (Math.floor(image.maxY) === Math.floor(image.startY) &&
            image.touchesCurrent.y > image.touchesStart.y))
      ) {
        image.isTouched = false;
        return;
      }
    }
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();

    image.isMoved = true;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
    }
    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
    }

    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
    }
    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
    }

    // Velocity
    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x =
      (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y =
      (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();

    gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
  }
  function onTouchEnd() {
    const zoom = carousel.zoom;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    let momentumDurationX = 300;
    let momentumDurationY = 300;
    const momentumDistanceX = velocity.x * momentumDurationX;
    const newPositionX = image.currentX + momentumDistanceX;
    const momentumDistanceY = velocity.y * momentumDurationY;
    const newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0)
      momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0)
      momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    const momentumDuration = Math.max(momentumDurationX, momentumDurationY);

    image.currentX = newPositionX;
    image.currentY = newPositionY;

    // Define if we need image drag
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

    gesture.$imageWrapEl
      .transition(momentumDuration)
      .transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
  }
  function onTransitionEnd() {
    const zoom = carousel.zoom;
    if (gesture.$slideEl && carousel.previousIndex !== carousel.activeIndex) {
      if (gesture.$imageEl) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
      }
      if (gesture.$imageWrapEl) {
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');
      }

      zoom.scale = 1;
      currentScale = 1;

      gesture.$slideEl = undefined;
      gesture.$imageEl = undefined;
      gesture.$imageWrapEl = undefined;
    }
  }

  function zoomIn(e) {
    const zoom = carousel.zoom;
    const params = carousel.params.zoom;

    if (!gesture.$slideEl) {
      if (e && e.target) {
        gesture.$slideEl = $(e.target).closest(`.${carousel.params.slideClass}`);
      }
      if (!gesture.$slideEl) {
        if (carousel.params.virtual && carousel.params.virtual.enabled && carousel.virtual) {
          gesture.$slideEl = carousel.$wrapperEl.children(`.${carousel.params.slideActiveClass}`);
        } else {
          gesture.$slideEl = carousel.slides.eq(carousel.activeIndex);
        }
      }

      gesture.$imageEl = gesture.$slideEl
        .find(`.${params.containerClass}`)
        .eq(0)
        .find('picture, img, svg, canvas, .carousel-zoom-target')
        .eq(0);
      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
    }
    if (
      !gesture.$imageEl ||
      gesture.$imageEl.length === 0 ||
      !gesture.$imageWrapEl ||
      gesture.$imageWrapEl.length === 0
    )
      return;
    if (carousel.params.cssMode) {
      carousel.wrapperEl.style.overflow = 'hidden';
      carousel.wrapperEl.style.touchAction = 'none';
    }

    gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);

    let touchX;
    let touchY;
    let offsetX;
    let offsetY;
    let diffX;
    let diffY;
    let translateX;
    let translateY;
    let imageWidth;
    let imageHeight;
    let scaledWidth;
    let scaledHeight;
    let translateMinX;
    let translateMinY;
    let translateMaxX;
    let translateMaxY;
    let slideWidth;
    let slideHeight;

    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }

    zoom.scale = gesture.$imageWrapEl.attr('data-carousel-zoom') || params.maxRatio;
    currentScale = gesture.$imageWrapEl.attr('data-carousel-zoom') || params.maxRatio;
    if (e) {
      slideWidth = gesture.$slideEl[0].offsetWidth;
      slideHeight = gesture.$slideEl[0].offsetHeight;
      offsetX = gesture.$slideEl.offset().left + window.scrollX;
      offsetY = gesture.$slideEl.offset().top + window.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;

      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;

      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;

      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;

      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }

      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    gesture.$imageWrapEl
      .transition(300)
      .transform(`translate3d(${translateX}px, ${translateY}px,0)`);
    gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
  }
  function zoomOut() {
    const zoom = carousel.zoom;
    const params = carousel.params.zoom;

    if (!gesture.$slideEl) {
      if (carousel.params.virtual && carousel.params.virtual.enabled && carousel.virtual) {
        gesture.$slideEl = carousel.$wrapperEl.children(`.${carousel.params.slideActiveClass}`);
      } else {
        gesture.$slideEl = carousel.slides.eq(carousel.activeIndex);
      }
      gesture.$imageEl = gesture.$slideEl
        .find(`.${params.containerClass}`)
        .eq(0)
        .find('picture, img, svg, canvas, .carousel-zoom-target')
        .eq(0);
      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
    }
    if (
      !gesture.$imageEl ||
      gesture.$imageEl.length === 0 ||
      !gesture.$imageWrapEl ||
      gesture.$imageWrapEl.length === 0
    )
      return;
    if (carousel.params.cssMode) {
      carousel.wrapperEl.style.overflow = '';
      carousel.wrapperEl.style.touchAction = '';
    }
    zoom.scale = 1;
    currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
    gesture.$slideEl = undefined;
  }

  // Toggle Zoom
  function zoomToggle(e) {
    const zoom = carousel.zoom;

    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoomOut();
    } else {
      // Zoom In
      zoomIn(e);
    }
  }

  function getListeners() {
    const support = carousel.support;
    const passiveListener =
      carousel.touchEvents.start === 'touchstart' &&
      support.passiveListener &&
      carousel.params.passiveListeners
        ? { passive: true, capture: false }
        : false;
    const activeListenerWithCapture = support.passiveListener
      ? { passive: false, capture: true }
      : true;
    return { passiveListener, activeListenerWithCapture };
  }

  function getSlideSelector() {
    return `.${carousel.params.slideClass}`;
  }

  function toggleGestures(method) {
    const { passiveListener } = getListeners();
    const slideSelector = getSlideSelector();
    carousel.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);
    carousel.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);
    carousel.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);
  }
  function enableGestures() {
    if (gesturesEnabled) return;
    gesturesEnabled = true;
    toggleGestures('on');
  }
  function disableGestures() {
    if (!gesturesEnabled) return;
    gesturesEnabled = false;
    toggleGestures('off');
  }

  // Attach/Detach Events
  function enable() {
    const zoom = carousel.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    const support = carousel.support;
    const { passiveListener, activeListenerWithCapture } = getListeners();
    const slideSelector = getSlideSelector();

    // Scale image
    if (support.gestures) {
      carousel.$wrapperEl.on(carousel.touchEvents.start, enableGestures, passiveListener);
      carousel.$wrapperEl.on(carousel.touchEvents.end, disableGestures, passiveListener);
    } else if (carousel.touchEvents.start === 'touchstart') {
      carousel.$wrapperEl.on(
        carousel.touchEvents.start,
        slideSelector,
        onGestureStart,
        passiveListener
      );
      carousel.$wrapperEl.on(
        carousel.touchEvents.move,
        slideSelector,
        onGestureChange,
        activeListenerWithCapture
      );
      carousel.$wrapperEl.on(
        carousel.touchEvents.end,
        slideSelector,
        onGestureEnd,
        passiveListener
      );
      if (carousel.touchEvents.cancel) {
        carousel.$wrapperEl.on(
          carousel.touchEvents.cancel,
          slideSelector,
          onGestureEnd,
          passiveListener
        );
      }
    }

    // Move image
    carousel.$wrapperEl.on(
      carousel.touchEvents.move,
      `.${carousel.params.zoom.containerClass}`,
      onTouchMove,
      activeListenerWithCapture
    );
  }
  function disable() {
    const zoom = carousel.zoom;
    if (!zoom.enabled) return;
    const support = carousel.support;
    zoom.enabled = false;

    const { passiveListener, activeListenerWithCapture } = getListeners();
    const slideSelector = getSlideSelector();

    // Scale image
    if (support.gestures) {
      carousel.$wrapperEl.off(carousel.touchEvents.start, enableGestures, passiveListener);
      carousel.$wrapperEl.off(carousel.touchEvents.end, disableGestures, passiveListener);
    } else if (carousel.touchEvents.start === 'touchstart') {
      carousel.$wrapperEl.off(
        carousel.touchEvents.start,
        slideSelector,
        onGestureStart,
        passiveListener
      );
      carousel.$wrapperEl.off(
        carousel.touchEvents.move,
        slideSelector,
        onGestureChange,
        activeListenerWithCapture
      );
      carousel.$wrapperEl.off(
        carousel.touchEvents.end,
        slideSelector,
        onGestureEnd,
        passiveListener
      );
      if (carousel.touchEvents.cancel) {
        carousel.$wrapperEl.off(
          carousel.touchEvents.cancel,
          slideSelector,
          onGestureEnd,
          passiveListener
        );
      }
    }

    // Move image
    carousel.$wrapperEl.off(
      carousel.touchEvents.move,
      `.${carousel.params.zoom.containerClass}`,
      onTouchMove,
      activeListenerWithCapture
    );
  }

  on('init', () => {
    if (carousel.params.zoom.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    disable();
  });
  on('touchStart', (_s, e) => {
    if (!carousel.zoom.enabled) return;
    onTouchStart(e);
  });
  on('touchEnd', (_s, e) => {
    if (!carousel.zoom.enabled) return;
    onTouchEnd(e);
  });
  on('doubleTap', (_s, e) => {
    if (
      !carousel.animating &&
      carousel.params.zoom.enabled &&
      carousel.zoom.enabled &&
      carousel.params.zoom.toggle
    ) {
      zoomToggle(e);
    }
  });
  on('transitionEnd', () => {
    if (carousel.zoom.enabled && carousel.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on('slideChange', () => {
    if (carousel.zoom.enabled && carousel.params.zoom.enabled && carousel.params.cssMode) {
      onTransitionEnd();
    }
  });

  Object.assign(carousel.zoom, {
    enable,
    disable,
    in: zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}
