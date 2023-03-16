//@ts-nocheck
/* eslint no-param-reassign: "off" */
import { getDocument } from 'ssr-window';
import $ from '../shared/dom';
import { extend, now, deleteProps } from '../shared/utils';
import { getSupport } from '../shared/get-support';
import { getDevice } from '../shared/get-device';
import { getBrowser } from '../shared/get-browser';

import Resize from './modules/resize/resize';
import Observer from './modules/observer/observer';
import Autoplay from './modules/autoplay/autoplay';
import Navigation from './modules/navigation/navigation';
import Pagination from './modules/pagination/pagination';

import eventsEmitter from './events-emitter';

import update from './update/index';
import translate from './translate/index';
import transition from './transition/index';
import slide from './slide/index';
import loop from './loop/index';
import grabCursor from './grab-cursor/index';
import events from './events/index';
import breakpoints from './breakpoints/index';
import classes from './classes/index';
import images from './images/index';
import checkOverflow from './check-overflow/index';

import defaults from './defaults';
import moduleExtendParams from './moduleExtendParams';

const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events,
  breakpoints,
  checkOverflow,
  classes,
  images
};

const extendedDefaults = {};

class Carousel {
  isHorizontal() {
    throw new Error('Method not implemented.');
  }
  updateSlides() {
    throw new Error('Method not implemented.');
  }
  updateProgress() {
    throw new Error('Method not implemented.');
  }
  updateSlidesClasses() {
    throw new Error('Method not implemented.');
  }
  setBreakpoint() {
    throw new Error('Method not implemented.');
  }
  getBreakpoint(breakpoints) {
    throw new Error('Method not implemented.');
  }
  constructor(...args) {
    let el;
    let params;
    if (
      args.length === 1 &&
      args[0].constructor &&
      Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object'
    ) {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};

    params = extend({}, params);
    if (el && !params.el) params.el = el;

    if (params.el && $(params.el).length > 1) {
      const carousels = [];
      $(params.el).each(containerEl => {
        const newParams = extend({}, params, { el: containerEl });
        carousels.push(new carousel(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return carousels;
    }

    // carousel Instance
    const carousel = this;
    carousel.__carousel__ = true;
    carousel.support = getSupport();
    carousel.device = getDevice({ userAgent: params.userAgent });
    carousel.browser = getBrowser();

    carousel.eventsListeners = {};
    carousel.eventsAnyListeners = [];
    carousel.modules = [...carousel.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      carousel.modules.push(...params.modules);
    }

    const allModulesParams = {};

    carousel.modules.forEach(mod => {
      mod({
        carousel,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: carousel.on.bind(carousel),
        once: carousel.once.bind(carousel),
        off: carousel.off.bind(carousel),
        emit: carousel.emit.bind(carousel)
      });
    });

    // Extend defaults with modules params
    const carouselParams = extend({}, defaults, allModulesParams);

    // Extend defaults with passed params
    carousel.params = extend({}, carouselParams, extendedDefaults, params);
    carousel.originalParams = extend({}, carousel.params);
    carousel.passedParams = extend({}, params);

    // add event listeners
    if (carousel.params && carousel.params.on) {
      Object.keys(carousel.params.on).forEach(eventName => {
        carousel.on(eventName, carousel.params.on[eventName]);
      });
    }
    if (carousel.params && carousel.params.onAny) {
      carousel.onAny(carousel.params.onAny);
    }

    // Save Dom lib
    carousel.$ = $;

    // Extend carousel
    Object.assign(carousel, {
      enabled: carousel.params.enabled,
      el,

      // Classes
      classNames: [],

      // Slides
      slides: $(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal() {
        return carousel.params.direction === 'horizontal';
      },
      isVertical() {
        return carousel.params.direction === 'vertical';
      },

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      // Locks
      allowSlideNext: carousel.params.allowSlideNext,
      allowSlidePrev: carousel.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        const desktop = ['pointerdown', 'pointermove', 'pointerup'];

        carousel.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3]
        };
        carousel.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return carousel.support.touch || !carousel.params.simulateTouch
          ? carousel.touchEventsTouch
          : carousel.touchEventsDesktop;
      })(),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: carousel.params.focusableElements,
        // Last click time
        lastClickTime: now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: carousel.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });

    carousel.emit('_carousel');

    // Init
    if (carousel.params.init) {
      carousel.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return carousel;
    this.virtual = undefined;
    this.loopCreate = undefined;
    this.loopDestroy = undefined;
    this.loopedSlides = undefined;
    this.lazy = undefined;
    this.controller = undefined;
    this.allowSlideNext = undefined;
    this.allowSlidePrev = undefined;
    this.currentBreakpoint = undefined;
  }

  enable() {
    const carousel = this;
    if (carousel.enabled) return;
    carousel.enabled = true;
    if (carousel.params.grabCursor) {
      carousel.setGrabCursor();
    }
    carousel.emit('enable');
  }

  disable() {
    const carousel = this;
    if (!carousel.enabled) return;
    carousel.enabled = false;
    if (carousel.params.grabCursor) {
      carousel.unsetGrabCursor();
    }
    carousel.emit('disable');
  }

  setProgress(progress, speed) {
    const carousel = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = carousel.minTranslate();
    const max = carousel.maxTranslate();
    const current = (max - min) * progress + min;
    carousel.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    carousel.updateActiveIndex();
    carousel.updateSlidesClasses();
  }

  emitContainerClasses() {
    const carousel = this;
    if (!carousel.params._emitClasses || !carousel.el) return;
    const cls = carousel.el.className.split(' ').filter(className => {
      return (
        className.indexOf('vts-carousel') === 0 ||
        className.indexOf(carousel.params.containerModifierClass) === 0
      );
    });
    carousel.emit('_containerClasses', cls.join(' '));
  }

  getSlideClasses(slideEl) {
    const carousel = this;
    if (carousel.destroyed) return '';

    return slideEl.className
      .split(' ')
      .filter(className => {
        return (
          className.indexOf('vts-carousel-slide') === 0 ||
          className.indexOf(carousel.params.slideClass) === 0
        );
      })
      .join(' ');
  }

  emitSlidesClasses() {
    const carousel = this;
    if (!carousel.params._emitClasses || !carousel.el) return;
    const updates = [];
    carousel.slides.each(slideEl => {
      const classNames = carousel.getSlideClasses(slideEl);
      updates.push({ slideEl, classNames });
      carousel.emit('_slideClass', slideEl, classNames);
    });
    carousel.emit('_slideClasses', updates);
  }

  slidesPerViewDynamic(view = 'current', exact = false) {
    const carousel = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: carouselSize,
      activeIndex
    } = carousel;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].carouselSlideSize;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].carouselSlideSize;
          spv += 1;
          if (slideSize > carouselSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].carouselSlideSize;
          spv += 1;
          if (slideSize > carouselSize) breakLoop = true;
        }
      }
    } else {
      // eslint-disable-next-line
      if (view === 'current') {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact
            ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < carouselSize
            : slidesGrid[i] - slidesGrid[activeIndex] < carouselSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        // previous
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < carouselSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }

  update() {
    const carousel = this;
    if (!carousel || carousel.destroyed) return;
    const { snapGrid, params } = carousel;

    // Loop recreation
    if (params.loop) {
      carousel.loopDestroy();
      carousel.loopCreate();
    }
    // Breakpoints
    if (params.breakpoints) {
      carousel.setBreakpoint();
    }
    carousel.updateSize();
    carousel.updateSlides();
    carousel.updateProgress();
    carousel.updateSlidesClasses();

    function setTranslate() {
      const translateValue = carousel.rtlTranslate ? carousel.translate * -1 : carousel.translate;
      const newTranslate = Math.min(
        Math.max(translateValue, carousel.maxTranslate()),
        carousel.minTranslate()
      );
      carousel.setTranslate(newTranslate);
      carousel.updateActiveIndex();
      carousel.updateSlidesClasses();
    }
    let translated;
    if (carousel.params.freeMode && carousel.params.freeMode.enabled) {
      setTranslate();
      if (carousel.params.autoHeight) {
        carousel.updateAutoHeight();
      }
    } else {
      if (params.loop) {
        translated = carousel.slideTo(carousel.realIndex + carousel.loopedSlides, 0, false, true);
      } else if (
        (carousel.params.slidesPerView === 'auto' || carousel.params.slidesPerView > 1) &&
        carousel.isEnd &&
        !carousel.params.centeredSlides
      ) {
        translated = carousel.slideTo(carousel.slides.length - 1, 0, false, true);
      } else {
        translated = carousel.slideTo(carousel.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== carousel.snapGrid) {
      carousel.checkOverflow();
    }

    carousel.emit('update');
  }

  changeDirection(newDirection, needUpdate = true) {
    const carousel = this;
    const currentDirection = carousel.params.direction;

    carousel.$el
      .removeClass(`${carousel.params.containerModifierClass}horizontal`)
      .removeClass(`${carousel.params.containerModifierClass}vertical`)
      .addClass(`${carousel.params.containerModifierClass}${newDirection}`);

    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (
      newDirection === currentDirection ||
      (newDirection !== 'horizontal' && newDirection !== 'vertical')
    ) {
      return carousel;
    }

    carousel.emitContainerClasses();

    carousel.params.direction = newDirection;

    carousel.slides.each(slideEl => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });

    carousel.emit('changeDirection');
    if (needUpdate) carousel.update();

    return carousel;
  }

  changeLanguageDirection(direction) {
    const carousel = this;
    if ((carousel.rtl && direction === 'rtl') || (!carousel.rtl && direction === 'ltr')) return;
    carousel.rtl = direction === 'rtl';
    carousel.rtlTranslate = carousel.params.direction === 'horizontal' && carousel.rtl;
    if (carousel.rtl) {
      carousel.$el.addClass(`${carousel.params.containerModifierClass}rtl`);
      carousel.el.dir = 'rtl';
    } else {
      carousel.$el.removeClass(`${carousel.params.containerModifierClass}rtl`);
      carousel.el.dir = 'ltr';
    }
    carousel.update();
  }

  mount(el) {
    const carousel = this;
    if (carousel.mounted) return true;

    // Find el
    const $el = $(el || carousel.params.el);
    el = $el[0];

    if (!el) {
      return false;
    }

    el.carousel = carousel;

    const getWrapperSelector = () => {
      return `.${(carousel.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };

    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = $(el.shadowRoot.querySelector(getWrapperSelector()));
        // Children needs to return slot items
        res.children = options => $el.children(options);
        return res;
      }
      if (!$el.children) {
        return $($el).children(getWrapperSelector());
      }
      return $el.children(getWrapperSelector());
    };
    // Find Wrapper
    let $wrapperEl = getWrapper();
    if ($wrapperEl.length === 0 && carousel.params.createElements) {
      const document = getDocument();
      const wrapper = document.createElement('div');
      $wrapperEl = $(wrapper);
      wrapper.className = carousel.params.wrapperClass;
      $el.append(wrapper);
      $el.children(`.${carousel.params.slideClass}`).each(slideEl => {
        $wrapperEl.append(slideEl);
      });
    }

    Object.assign(carousel, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],
      mounted: true,

      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
      rtlTranslate:
        carousel.params.direction === 'horizontal' &&
        (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box'
    });

    return true;
  }

  init(el) {
    const carousel = this;
    if (carousel.initialized) return carousel;

    const mounted = carousel.mount(el);
    if (mounted === false) return carousel;

    carousel.emit('beforeInit');

    // Set breakpoint
    if (carousel.params.breakpoints) {
      carousel.setBreakpoint();
    }

    // Add Classes
    carousel.addClasses();

    // Create loop
    if (carousel.params.loop) {
      carousel.loopCreate();
    }

    // Update size
    carousel.updateSize();

    // Update slides
    carousel.updateSlides();

    if (carousel.params.watchOverflow) {
      carousel.checkOverflow();
    }

    // Set Grab Cursor
    if (carousel.params.grabCursor && carousel.enabled) {
      carousel.setGrabCursor();
    }

    if (carousel.params.preloadImages) {
      carousel.preloadImages();
    }

    // Slide To Initial Slide
    if (carousel.params.loop) {
      carousel.slideTo(
        carousel.params.initialSlide + carousel.loopedSlides,
        0,
        carousel.params.runCallbacksOnInit,
        false,
        true
      );
    } else {
      carousel.slideTo(
        carousel.params.initialSlide,
        0,
        carousel.params.runCallbacksOnInit,
        false,
        true
      );
    }

    // Attach events
    carousel.attachEvents();

    // Init Flag
    carousel.initialized = true;

    // Emit
    carousel.emit('init');
    carousel.emit('afterInit');

    return carousel;
  }

  destroy(deleteInstance = true, cleanStyles = true) {
    const carousel = this;
    const { params, $el, $wrapperEl, slides } = carousel;

    if (typeof carousel.params === 'undefined' || carousel.destroyed) {
      return null;
    }

    carousel.emit('beforeDestroy');

    // Init Flag
    carousel.initialized = false;

    // Detach events
    carousel.detachEvents();

    // Destroy loop
    if (params.loop) {
      carousel.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      carousel.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass(
            [
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass
            ].join(' ')
          )
          .removeAttr('style')
          .removeAttr('data-carousel-slide-index');
      }
    }

    carousel.emit('destroy');

    // Detach emitter events
    Object.keys(carousel.eventsListeners).forEach(eventName => {
      carousel.off(eventName);
    });

    if (deleteInstance !== false) {
      carousel.$el[0].carousel = null;
      deleteProps(carousel);
    }
    carousel.destroyed = true;

    return null;
  }

  static extendDefaults(newDefaults) {
    extend(extendedDefaults, newDefaults);
  }

  static get extendedDefaults() {
    return extendedDefaults;
  }

  static get defaults() {
    return defaults;
  }

  static installModule(mod) {
    if (!Carousel.prototype.__modules__) Carousel.prototype.__modules__ = [];
    const modules = Carousel.prototype.__modules__;

    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }

  static use(module) {
    if (Array.isArray(module)) {
      module.forEach(m => Carousel.installModule(m));
      return Carousel;
    }
    Carousel.installModule(module);
    return Carousel;
  }
}

Object.keys(prototypes).forEach(prototypeGroup => {
  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
    Carousel.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});

Carousel.use([Resize, Observer, Autoplay, Navigation, Pagination]);

export default Carousel;
