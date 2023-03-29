//@ts-nocheck
/* eslint-disable consistent-return */
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../../shared/dom';

export default function Keyboard({ carousel, extendParams, on, emit }) {
  const document = getDocument();
  const window = getWindow();
  carousel.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });

  function handle(event) {
    if (!carousel.enabled) return;

    const { rtlTranslate: rtl } = carousel;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    const pageUpDown = carousel.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    // Directions locks
    if (
      !carousel.allowSlideNext &&
      ((carousel.isHorizontal() && isArrowRight) ||
        (carousel.isVertical() && isArrowDown) ||
        isPageDown)
    ) {
      return false;
    }
    if (
      !carousel.allowSlidePrev &&
      ((carousel.isHorizontal() && isArrowLeft) || (carousel.isVertical() && isArrowUp) || isPageUp)
    ) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (
      document.activeElement &&
      document.activeElement.nodeName &&
      (document.activeElement.nodeName.toLowerCase() === 'input' ||
        document.activeElement.nodeName.toLowerCase() === 'textarea')
    ) {
      return undefined;
    }
    if (
      carousel.params.keyboard.onlyInViewport &&
      (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)
    ) {
      let inView = false;
      // Check that carousel should be inside of visible area of window
      if (
        carousel.$el.parents(`.${carousel.params.slideClass}`).length > 0 &&
        carousel.$el.parents(`.${carousel.params.slideActiveClass}`).length === 0
      ) {
        return undefined;
      }

      const $el = carousel.$el;
      const carouselWidth = $el[0].clientWidth;
      const carouselHeight = $el[0].clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const carouselOffset = carousel.$el.offset();
      if (rtl) carouselOffset.left -= carousel.$el[0].scrollLeft;
      const carouselCoord = [
        [carouselOffset.left, carouselOffset.top],
        [carouselOffset.left + carouselWidth, carouselOffset.top],
        [carouselOffset.left, carouselOffset.top + carouselHeight],
        [carouselOffset.left + carouselWidth, carouselOffset.top + carouselHeight]
      ];
      for (let i = 0; i < carouselCoord.length; i += 1) {
        const point = carouselCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (carousel.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
        carousel.slideNext();
      if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
        carousel.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) carousel.slideNext();
      if (isPageUp || isArrowUp) carousel.slidePrev();
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (carousel.keyboard.enabled) return;
    $(document).on('keydown', handle);
    carousel.keyboard.enabled = true;
  }
  function disable() {
    if (!carousel.keyboard.enabled) return;
    $(document).off('keydown', handle);
    carousel.keyboard.enabled = false;
  }

  on('init', () => {
    if (carousel.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (carousel.keyboard.enabled) {
      disable();
    }
  });

  Object.assign(carousel.keyboard, {
    enable,
    disable
  });
}
