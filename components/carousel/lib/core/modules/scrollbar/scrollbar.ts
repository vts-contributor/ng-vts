//@ts-nocheck
import { getDocument } from 'ssr-window';
import $ from '../../../shared/dom';
import { nextTick } from '../../../shared/utils';
import createElementIfNotDefined from '../../../shared/create-element-if-not-defined';

export default function Scrollbar({ carousel, extendParams, on, emit }) {
  const document = getDocument();

  let isTouched = false;
  let timeout = null;
  let dragTimeout = null;
  let dragStartPos;
  let dragSize;
  let trackSize;
  let divider;

  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'vts-carousel-scrollbar-lock',
      dragClass: 'vts-carousel-scrollbar-drag',
      scrollbarDisabledClass: 'vts-carousel-scrollbar-disabled',
      horizontalClass: `carousel-scrollbar-horizontal`,
      verticalClass: `carousel-scrollbar-vertical`
    }
  });

  carousel.scrollbar = {
    el: null,
    dragEl: null,
    $el: null,
    $dragEl: null
  };

  function setTranslate() {
    if (!carousel.params.scrollbar.el || !carousel.scrollbar.el) return;
    const { scrollbar, rtlTranslate: rtl, progress } = carousel;
    const { $dragEl, $el } = scrollbar;
    const params = carousel.params.scrollbar;

    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (carousel.isHorizontal()) {
      $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
      $dragEl[0].style.width = `${newSize}px`;
    } else {
      $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
      $dragEl[0].style.height = `${newSize}px`;
    }
    if (params.hide) {
      clearTimeout(timeout);
      $el[0].style.opacity = 1;
      timeout = setTimeout(() => {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!carousel.params.scrollbar.el || !carousel.scrollbar.el) return;
    carousel.scrollbar.$dragEl.transition(duration);
  }
  function updateSize() {
    if (!carousel.params.scrollbar.el || !carousel.scrollbar.el) return;

    const { scrollbar } = carousel;
    const { $dragEl, $el } = scrollbar;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    trackSize = carousel.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    divider =
      carousel.size /
      (carousel.virtualSize +
        carousel.params.slidesOffsetBefore -
        (carousel.params.centeredSlides ? carousel.snapGrid[0] : 0));
    if (carousel.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(carousel.params.scrollbar.dragSize, 10);
    }

    if (carousel.isHorizontal()) {
      $dragEl[0].style.width = `${dragSize}px`;
    } else {
      $dragEl[0].style.height = `${dragSize}px`;
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (carousel.params.scrollbar.hide) {
      $el[0].style.opacity = 0;
    }

    if (carousel.params.watchOverflow && carousel.enabled) {
      scrollbar.$el[carousel.isLocked ? 'addClass' : 'removeClass'](
        carousel.params.scrollbar.lockClass
      );
    }
  }
  function getPointerPosition(e) {
    if (carousel.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove'
        ? e.targetTouches[0].clientX
        : e.clientX;
    }
    return e.type === 'touchstart' || e.type === 'touchmove'
      ? e.targetTouches[0].clientY
      : e.clientY;
  }
  function setDragPosition(e) {
    const { scrollbar, rtlTranslate: rtl } = carousel;
    const { $el } = scrollbar;

    let positionRatio;
    positionRatio =
      (getPointerPosition(e) -
        $el.offset()[carousel.isHorizontal() ? 'left' : 'top'] -
        (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
      (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    const position =
      carousel.minTranslate() + (carousel.maxTranslate() - carousel.minTranslate()) * positionRatio;

    carousel.updateProgress(position);
    carousel.setTranslate(position);
    carousel.updateActiveIndex();
    carousel.updateSlidesClasses();
  }
  function onDragStart(e) {
    const params = carousel.params.scrollbar;
    const { scrollbar, $wrapperEl } = carousel;
    const { $el, $dragEl } = scrollbar;
    isTouched = true;
    dragStartPos =
      e.target === $dragEl[0] || e.target === $dragEl
        ? getPointerPosition(e) -
          e.target.getBoundingClientRect()[carousel.isHorizontal() ? 'left' : 'top']
        : null;
    e.preventDefault();
    e.stopPropagation();

    $wrapperEl.transition(100);
    $dragEl.transition(100);
    setDragPosition(e);

    clearTimeout(dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    if (carousel.params.cssMode) {
      carousel.$wrapperEl.css('scroll-snap-type', 'none');
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e) {
    const { scrollbar, $wrapperEl } = carousel;
    const { $el, $dragEl } = scrollbar;

    if (!isTouched) return;
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(e) {
    const params = carousel.params.scrollbar;
    const { scrollbar, $wrapperEl } = carousel;
    const { $el } = scrollbar;

    if (!isTouched) return;
    isTouched = false;
    if (carousel.params.cssMode) {
      carousel.$wrapperEl.css('scroll-snap-type', '');
      $wrapperEl.transition('');
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = nextTick(() => {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      carousel.slideToClosest();
    }
  }

  function events(method) {
    const { scrollbar, touchEventsTouch, touchEventsDesktop, params, support } = carousel;
    const $el = scrollbar.$el;
    if (!$el) return;
    const target = $el[0];
    const activeListener =
      support.passiveListener && params.passiveListeners
        ? { passive: false, capture: false }
        : false;
    const passiveListener =
      support.passiveListener && params.passiveListeners
        ? { passive: true, capture: false }
        : false;
    if (!target) return;
    const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    if (!support.touch) {
      target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
      document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
      document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
    } else {
      target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
      target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
      target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
    }
  }

  function enableDraggable() {
    if (!carousel.params.scrollbar.el || !carousel.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!carousel.params.scrollbar.el || !carousel.scrollbar.el) return;
    events('off');
  }
  function init() {
    const { scrollbar, $el: $carouselEl } = carousel;
    carousel.params.scrollbar = createElementIfNotDefined(
      carousel,
      carousel.originalParams.scrollbar,
      carousel.params.scrollbar,
      { el: 'vts-carousel-scrollbar' }
    );
    const params = carousel.params.scrollbar;
    if (!params.el) return;

    let $el = $(params.el);
    if (
      carousel.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      $carouselEl.find(params.el).length === 1
    ) {
      $el = $carouselEl.find(params.el);
    }

    $el.addClass(carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);

    let $dragEl = $el.find(`.${carousel.params.scrollbar.dragClass}`);
    if ($dragEl.length === 0) {
      $dragEl = $(`<div class="${carousel.params.scrollbar.dragClass}"></div>`);
      $el.append($dragEl);
    }

    Object.assign(scrollbar, {
      $el,
      el: $el[0],
      $dragEl,
      dragEl: $dragEl[0]
    });

    if (params.draggable) {
      enableDraggable();
    }

    if ($el) {
      $el[carousel.enabled ? 'removeClass' : 'addClass'](carousel.params.scrollbar.lockClass);
    }
  }
  function destroy() {
    const params = carousel.params.scrollbar;
    const $el = carousel.scrollbar.$el;
    if ($el) {
      $el.removeClass(carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);
    }

    disableDraggable();
  }

  on('init', () => {
    if (carousel.params.scrollbar.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock', () => {
    updateSize();
  });
  on('setTranslate', () => {
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    setTransition(duration);
  });
  on('enable disable', () => {
    const { $el } = carousel.scrollbar;
    if ($el) {
      $el[carousel.enabled ? 'removeClass' : 'addClass'](carousel.params.scrollbar.lockClass);
    }
  });
  on('destroy', () => {
    destroy();
  });

  const enable = () => {
    carousel.$el.removeClass(carousel.params.scrollbar.scrollbarDisabledClass);
    if (carousel.scrollbar.$el) {
      carousel.scrollbar.$el.removeClass(carousel.params.scrollbar.scrollbarDisabledClass);
    }
    init();
    updateSize();
    setTranslate();
  };

  const disable = () => {
    carousel.$el.addClass(carousel.params.scrollbar.scrollbarDisabledClass);
    if (carousel.scrollbar.$el) {
      carousel.scrollbar.$el.addClass(carousel.params.scrollbar.scrollbarDisabledClass);
    }
    destroy();
  };

  Object.assign(carousel.scrollbar, {
    enable,
    disable,
    updateSize,
    setTranslate,
    init,
    destroy
  });
}
