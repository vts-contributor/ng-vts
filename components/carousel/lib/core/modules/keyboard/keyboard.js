/* eslint-disable consistent-return */
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom.js';

export default function Keyboard({ Carousel, extendParams, on, emit }) {
  const document = getDocument();
  const window = getWindow();
  Carousel.keyboard = {
    enabled: false,
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true,
    },
  });

  function handle(event) {
    if (!Carousel.enabled) return;

    const { rtlTranslate: rtl } = Carousel;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    const pageUpDown = Carousel.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    // Directions locks
    if (
      !Carousel.allowSlideNext &&
      ((Carousel.isHorizontal() && isArrowRight) ||
        (Carousel.isVertical() && isArrowDown) ||
        isPageDown)
    ) {
      return false;
    }
    if (
      !Carousel.allowSlidePrev &&
      ((Carousel.isHorizontal() && isArrowLeft) || (Carousel.isVertical() && isArrowUp) || isPageUp)
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
      Carousel.params.keyboard.onlyInViewport &&
      (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)
    ) {
      let inView = false;
      // Check that Carousel should be inside of visible area of window
      if (
        Carousel.$el.parents(`.${Carousel.params.slideClass}`).length > 0 &&
        Carousel.$el.parents(`.${Carousel.params.slideActiveClass}`).length === 0
      ) {
        return undefined;
      }

      const $el = Carousel.$el;
      const CarouselWidth = $el[0].clientWidth;
      const CarouselHeight = $el[0].clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const CarouselOffset = Carousel.$el.offset();
      if (rtl) CarouselOffset.left -= Carousel.$el[0].scrollLeft;
      const CarouselCoord = [
        [CarouselOffset.left, CarouselOffset.top],
        [CarouselOffset.left + CarouselWidth, CarouselOffset.top],
        [CarouselOffset.left, CarouselOffset.top + CarouselHeight],
        [CarouselOffset.left + CarouselWidth, CarouselOffset.top + CarouselHeight],
      ];
      for (let i = 0; i < CarouselCoord.length; i += 1) {
        const point = CarouselCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (Carousel.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
        Carousel.slideNext();
      if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
        Carousel.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) Carousel.slideNext();
      if (isPageUp || isArrowUp) Carousel.slidePrev();
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (Carousel.keyboard.enabled) return;
    $(document).on('keydown', handle);
    Carousel.keyboard.enabled = true;
  }
  function disable() {
    if (!Carousel.keyboard.enabled) return;
    $(document).off('keydown', handle);
    Carousel.keyboard.enabled = false;
  }

  on('init', () => {
    if (Carousel.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (Carousel.keyboard.enabled) {
      disable();
    }
  });

  Object.assign(Carousel.keyboard, {
    enable,
    disable,
  });
}
