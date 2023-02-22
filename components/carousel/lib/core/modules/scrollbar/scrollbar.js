import { getDocument } from 'ssr-window';
import $ from '../../shared/dom.js';
import { nextTick } from '../../shared/utils.js';
import createElementIfNotDefined from '../../shared/create-element-if-not-defined.js';

export default function Scrollbar({ Carousel, extendParams, on, emit }) {
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
      lockClass: 'Carousel-scrollbar-lock',
      dragClass: 'Carousel-scrollbar-drag',
      scrollbarDisabledClass: 'Carousel-scrollbar-disabled',
      horizontalClass: `Carousel-scrollbar-horizontal`,
      verticalClass: `Carousel-scrollbar-vertical`,
    },
  });

  Carousel.scrollbar = {
    el: null,
    dragEl: null,
    $el: null,
    $dragEl: null,
  };

  function setTranslate() {
    if (!Carousel.params.scrollbar.el || !Carousel.scrollbar.el) return;
    const { scrollbar, rtlTranslate: rtl, progress } = Carousel;
    const { $dragEl, $el } = scrollbar;
    const params = Carousel.params.scrollbar;

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
    if (Carousel.isHorizontal()) {
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
    if (!Carousel.params.scrollbar.el || !Carousel.scrollbar.el) return;
    Carousel.scrollbar.$dragEl.transition(duration);
  }
  function updateSize() {
    if (!Carousel.params.scrollbar.el || !Carousel.scrollbar.el) return;

    const { scrollbar } = Carousel;
    const { $dragEl, $el } = scrollbar;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    trackSize = Carousel.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    divider =
      Carousel.size /
      (Carousel.virtualSize +
        Carousel.params.slidesOffsetBefore -
        (Carousel.params.centeredSlides ? Carousel.snapGrid[0] : 0));
    if (Carousel.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(Carousel.params.scrollbar.dragSize, 10);
    }

    if (Carousel.isHorizontal()) {
      $dragEl[0].style.width = `${dragSize}px`;
    } else {
      $dragEl[0].style.height = `${dragSize}px`;
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (Carousel.params.scrollbar.hide) {
      $el[0].style.opacity = 0;
    }

    if (Carousel.params.watchOverflow && Carousel.enabled) {
      scrollbar.$el[Carousel.isLocked ? 'addClass' : 'removeClass'](
        Carousel.params.scrollbar.lockClass,
      );
    }
  }
  function getPointerPosition(e) {
    if (Carousel.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove'
        ? e.targetTouches[0].clientX
        : e.clientX;
    }
    return e.type === 'touchstart' || e.type === 'touchmove'
      ? e.targetTouches[0].clientY
      : e.clientY;
  }
  function setDragPosition(e) {
    const { scrollbar, rtlTranslate: rtl } = Carousel;
    const { $el } = scrollbar;

    let positionRatio;
    positionRatio =
      (getPointerPosition(e) -
        $el.offset()[Carousel.isHorizontal() ? 'left' : 'top'] -
        (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
      (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    const position =
      Carousel.minTranslate() + (Carousel.maxTranslate() - Carousel.minTranslate()) * positionRatio;

    Carousel.updateProgress(position);
    Carousel.setTranslate(position);
    Carousel.updateActiveIndex();
    Carousel.updateSlidesClasses();
  }
  function onDragStart(e) {
    const params = Carousel.params.scrollbar;
    const { scrollbar, $wrapperEl } = Carousel;
    const { $el, $dragEl } = scrollbar;
    isTouched = true;
    dragStartPos =
      e.target === $dragEl[0] || e.target === $dragEl
        ? getPointerPosition(e) -
          e.target.getBoundingClientRect()[Carousel.isHorizontal() ? 'left' : 'top']
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
    if (Carousel.params.cssMode) {
      Carousel.$wrapperEl.css('scroll-snap-type', 'none');
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e) {
    const { scrollbar, $wrapperEl } = Carousel;
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
    const params = Carousel.params.scrollbar;
    const { scrollbar, $wrapperEl } = Carousel;
    const { $el } = scrollbar;

    if (!isTouched) return;
    isTouched = false;
    if (Carousel.params.cssMode) {
      Carousel.$wrapperEl.css('scroll-snap-type', '');
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
      Carousel.slideToClosest();
    }
  }

  function events(method) {
    const { scrollbar, touchEventsTouch, touchEventsDesktop, params, support } = Carousel;
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
    if (!Carousel.params.scrollbar.el || !Carousel.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!Carousel.params.scrollbar.el || !Carousel.scrollbar.el) return;
    events('off');
  }
  function init() {
    const { scrollbar, $el: $CarouselEl } = Carousel;
    Carousel.params.scrollbar = createElementIfNotDefined(
      Carousel,
      Carousel.originalParams.scrollbar,
      Carousel.params.scrollbar,
      { el: 'Carousel-scrollbar' },
    );
    const params = Carousel.params.scrollbar;
    if (!params.el) return;

    let $el = $(params.el);
    if (
      Carousel.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      $CarouselEl.find(params.el).length === 1
    ) {
      $el = $CarouselEl.find(params.el);
    }

    $el.addClass(Carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);

    let $dragEl = $el.find(`.${Carousel.params.scrollbar.dragClass}`);
    if ($dragEl.length === 0) {
      $dragEl = $(`<div class="${Carousel.params.scrollbar.dragClass}"></div>`);
      $el.append($dragEl);
    }

    Object.assign(scrollbar, {
      $el,
      el: $el[0],
      $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      enableDraggable();
    }

    if ($el) {
      $el[Carousel.enabled ? 'removeClass' : 'addClass'](Carousel.params.scrollbar.lockClass);
    }
  }
  function destroy() {
    const params = Carousel.params.scrollbar;
    const $el = Carousel.scrollbar.$el;
    if ($el) {
      $el.removeClass(Carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);
    }

    disableDraggable();
  }

  on('init', () => {
    if (Carousel.params.scrollbar.enabled === false) {
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
    const { $el } = Carousel.scrollbar;
    if ($el) {
      $el[Carousel.enabled ? 'removeClass' : 'addClass'](Carousel.params.scrollbar.lockClass);
    }
  });
  on('destroy', () => {
    destroy();
  });

  const enable = () => {
    Carousel.$el.removeClass(Carousel.params.scrollbar.scrollbarDisabledClass);
    if (Carousel.scrollbar.$el) {
      Carousel.scrollbar.$el.removeClass(Carousel.params.scrollbar.scrollbarDisabledClass);
    }
    init();
    updateSize();
    setTranslate();
  };

  const disable = () => {
    Carousel.$el.addClass(Carousel.params.scrollbar.scrollbarDisabledClass);
    if (Carousel.scrollbar.$el) {
      Carousel.scrollbar.$el.addClass(Carousel.params.scrollbar.scrollbarDisabledClass);
    }
    destroy();
  };

  Object.assign(Carousel.scrollbar, {
    enable,
    disable,
    updateSize,
    setTranslate,
    init,
    destroy,
  });
}
