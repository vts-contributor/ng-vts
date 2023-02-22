/* eslint no-param-reassign: "off" */
import { getDocument } from 'ssr-window';
import $ from '../shared/dom.js';
import { extend, now, deleteProps } from '../shared/utils.js';
import { getSupport } from '../shared/get-support.js';
import { getDevice } from '../shared/get-device.js';
import { getBrowser } from '../shared/get-browser.js';

import Resize from './modules/resize/resize.js';
import Observer from './modules/observer/observer.js';
import Autoplay from './modules/autoplay/autoplay.js';
import Navigation from './modules/navigation/navigation.js';
import Pagination from './modules/pagination/pagination.js'

import eventsEmitter from './events-emitter.js';

import update from './update/index.js';
import translate from './translate/index.js';
import transition from './transition/index.js';
import slide from './slide/index.js';
import loop from './loop/index.js';
import grabCursor from './grab-cursor/index.js';
import events from './events/index.js';
import breakpoints from './breakpoints/index.js';
import classes from './classes/index.js';
import images from './images/index.js';
import checkOverflow from './check-overflow/index.js';

import defaults from './defaults.js';
import moduleExtendParams from './moduleExtendParams.js';

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
  images,
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
      const Carousels = [];
      $(params.el).each((containerEl) => {
        const newParams = extend({}, params, { el: containerEl });
        Carousels.push(new Carousel(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return Carousels;
    }

    // Carousel Instance
    const Carousel = this;
    Carousel.__Carousel__ = true;
    Carousel.support = getSupport();
    Carousel.device = getDevice({ userAgent: params.userAgent });
    Carousel.browser = getBrowser();

    Carousel.eventsListeners = {};
    Carousel.eventsAnyListeners = [];
    Carousel.modules = [...Carousel.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      Carousel.modules.push(...params.modules);
    }

    const allModulesParams = {};

    Carousel.modules.forEach((mod) => {
      mod({
        Carousel,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: Carousel.on.bind(Carousel),
        once: Carousel.once.bind(Carousel),
        off: Carousel.off.bind(Carousel),
        emit: Carousel.emit.bind(Carousel),
      });
    });

    // Extend defaults with modules params
    const CarouselParams = extend({}, defaults, allModulesParams);

    // Extend defaults with passed params
    Carousel.params = extend({}, CarouselParams, extendedDefaults, params);
    Carousel.originalParams = extend({}, Carousel.params);
    Carousel.passedParams = extend({}, params);

    // add event listeners
    if (Carousel.params && Carousel.params.on) {
      Object.keys(Carousel.params.on).forEach((eventName) => {
        Carousel.on(eventName, Carousel.params.on[eventName]);
      });
    }
    if (Carousel.params && Carousel.params.onAny) {
      Carousel.onAny(Carousel.params.onAny);
    }

    // Save Dom lib
    Carousel.$ = $;

    // Extend Carousel
    Object.assign(Carousel, {
      enabled: Carousel.params.enabled,
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
        return Carousel.params.direction === 'horizontal';
      },
      isVertical() {
        return Carousel.params.direction === 'vertical';
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
      allowSlideNext: Carousel.params.allowSlideNext,
      allowSlidePrev: Carousel.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        const desktop = ['pointerdown', 'pointermove', 'pointerup'];

        Carousel.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3],
        };
        Carousel.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2],
        };
        return Carousel.support.touch || !Carousel.params.simulateTouch
          ? Carousel.touchEventsTouch
          : Carousel.touchEventsDesktop;
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
        focusableElements: Carousel.params.focusableElements,
        // Last click time
        lastClickTime: now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined,
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: Carousel.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0,
    });

    Carousel.emit('_Carousel');

    // Init
    if (Carousel.params.init) {
      Carousel.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return Carousel;
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
    const Carousel = this;
    if (Carousel.enabled) return;
    Carousel.enabled = true;
    if (Carousel.params.grabCursor) {
      Carousel.setGrabCursor();
    }
    Carousel.emit('enable');
  }

  disable() {
    const Carousel = this;
    if (!Carousel.enabled) return;
    Carousel.enabled = false;
    if (Carousel.params.grabCursor) {
      Carousel.unsetGrabCursor();
    }
    Carousel.emit('disable');
  }

  setProgress(progress, speed) {
    const Carousel = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = Carousel.minTranslate();
    const max = Carousel.maxTranslate();
    const current = (max - min) * progress + min;
    Carousel.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    Carousel.updateActiveIndex();
    Carousel.updateSlidesClasses();
  }

  emitContainerClasses() {
    const Carousel = this;
    if (!Carousel.params._emitClasses || !Carousel.el) return;
    const cls = Carousel.el.className.split(' ').filter((className) => {
      return (
        className.indexOf('Carousel') === 0 ||
        className.indexOf(Carousel.params.containerModifierClass) === 0
      );
    });
    Carousel.emit('_containerClasses', cls.join(' '));
  }

  getSlideClasses(slideEl) {
    const Carousel = this;
    if (Carousel.destroyed) return '';

    return slideEl.className
      .split(' ')
      .filter((className) => {
        return (
          className.indexOf('Carousel-slide') === 0 ||
          className.indexOf(Carousel.params.slideClass) === 0
        );
      })
      .join(' ');
  }

  emitSlidesClasses() {
    const Carousel = this;
    if (!Carousel.params._emitClasses || !Carousel.el) return;
    const updates = [];
    Carousel.slides.each((slideEl) => {
      const classNames = Carousel.getSlideClasses(slideEl);
      updates.push({ slideEl, classNames });
      Carousel.emit('_slideClass', slideEl, classNames);
    });
    Carousel.emit('_slideClasses', updates);
  }

  slidesPerViewDynamic(view = 'current', exact = false) {
    const Carousel = this;
    const { params, slides, slidesGrid, slidesSizesGrid, size: CarouselSize, activeIndex } = Carousel;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].CarouselSlideSize;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].CarouselSlideSize;
          spv += 1;
          if (slideSize > CarouselSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].CarouselSlideSize;
          spv += 1;
          if (slideSize > CarouselSize) breakLoop = true;
        }
      }
    } else {
      // eslint-disable-next-line
      if (view === 'current') {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact
            ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < CarouselSize
            : slidesGrid[i] - slidesGrid[activeIndex] < CarouselSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        // previous
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < CarouselSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }

  update() {
    const Carousel = this;
    if (!Carousel || Carousel.destroyed) return;
    const { snapGrid, params } = Carousel;
    // Breakpoints
    if (params.breakpoints) {
      Carousel.setBreakpoint();
    }
    Carousel.updateSize();
    Carousel.updateSlides();
    Carousel.updateProgress();
    Carousel.updateSlidesClasses();

    function setTranslate() {
      const translateValue = Carousel.rtlTranslate ? Carousel.translate * -1 : Carousel.translate;
      const newTranslate = Math.min(
        Math.max(translateValue, Carousel.maxTranslate()),
        Carousel.minTranslate(),
      );
      Carousel.setTranslate(newTranslate);
      Carousel.updateActiveIndex();
      Carousel.updateSlidesClasses();
    }
    let translated;
    if (Carousel.params.freeMode && Carousel.params.freeMode.enabled) {
      setTranslate();
      if (Carousel.params.autoHeight) {
        Carousel.updateAutoHeight();
      }
    } else {
      if (
        (Carousel.params.vtsSlidesPerView === 'auto' || Carousel.params.vtsSlidesPerView > 1) &&
        Carousel.isEnd &&
        !Carousel.params.centeredSlides
      ) {
        translated = Carousel.slideTo(Carousel.slides.length - 1, 0, false, true);
      } else {
        translated = Carousel.slideTo(Carousel.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== Carousel.snapGrid) {
      Carousel.checkOverflow();
    }
    Carousel.emit('update');
  }

  changeDirection(newDirection, needUpdate = true) {
    const Carousel = this;
    const currentDirection = Carousel.params.direction;
    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (
      newDirection === currentDirection ||
      (newDirection !== 'horizontal' && newDirection !== 'vertical')
    ) {
      return Carousel;
    }

    Carousel.$el
      .removeClass(`${Carousel.params.containerModifierClass}${currentDirection}`)
      .addClass(`${Carousel.params.containerModifierClass}${newDirection}`);
    Carousel.emitContainerClasses();

    Carousel.params.direction = newDirection;

    Carousel.slides.each((slideEl) => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });

    Carousel.emit('changeDirection');
    if (needUpdate) Carousel.update();

    return Carousel;
  }

  changeLanguageDirection(direction) {
    const Carousel = this;
    if ((Carousel.rtl && direction === 'rtl') || (!Carousel.rtl && direction === 'ltr')) return;
    Carousel.rtl = direction === 'rtl';
    Carousel.rtlTranslate = Carousel.params.direction === 'horizontal' && Carousel.rtl;
    if (Carousel.rtl) {
      Carousel.$el.addClass(`${Carousel.params.containerModifierClass}rtl`);
      Carousel.el.dir = 'rtl';
    } else {
      Carousel.$el.removeClass(`${Carousel.params.containerModifierClass}rtl`);
      Carousel.el.dir = 'ltr';
    }
    Carousel.update();
  }

  mount(el) {
    const Carousel = this;
    if (Carousel.mounted) return true;

    // Find el
    const $el = $(el || Carousel.params.el);
    el = $el[0];

    if (!el) {
      return false;
    }

    el.Carousel = Carousel;

    const getWrapperSelector = () => {
      return `.${(Carousel.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };

    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = $(el.shadowRoot.querySelector(getWrapperSelector()));
        // Children needs to return slot items
        res.children = (options) => $el.children(options);
        return res;
      }
      if (!$el.children) {
        return $($el).children(getWrapperSelector());
      }
      return $el.children(getWrapperSelector());
    };
    // Find Wrapper
    let $wrapperEl = getWrapper();
    if ($wrapperEl.length === 0 && Carousel.params.createElements) {
      const document = getDocument();
      const wrapper = document.createElement('div');
      $wrapperEl = $(wrapper);
      wrapper.className = Carousel.params.wrapperClass;
      $el.append(wrapper);
      $el.children(`.${Carousel.params.slideClass}`).each((slideEl) => {
        $wrapperEl.append(slideEl);
      });
    }

    Object.assign(Carousel, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],
      mounted: true,

      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
      rtlTranslate:
        Carousel.params.direction === 'horizontal' &&
        (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',
    });

    return true;
  }

  init(el) {
    const Carousel = this;
    if (Carousel.initialized) return Carousel;

    const mounted = Carousel.mount(el);
    if (mounted === false) return Carousel;

    Carousel.emit('beforeInit');

    // Set breakpoint
    if (Carousel.params.breakpoints) {
      Carousel.setBreakpoint();
    }

    // Add Classes
    Carousel.addClasses();

    // Create loop
    if (Carousel.params.loop) {
      Carousel.loopCreate();
    }

    // Update size
    Carousel.updateSize();

    // Update slides
    Carousel.updateSlides();

    if (Carousel.params.watchOverflow) {
      Carousel.checkOverflow();
    }

    // Set Grab Cursor
    if (Carousel.params.grabCursor && Carousel.enabled) {
      Carousel.setGrabCursor();
    }

    if (Carousel.params.preloadImages) {
      Carousel.preloadImages();
    }

    // Slide To Initial Slide
    if (Carousel.params.loop) {
      Carousel.slideTo(
        Carousel.params.initialSlide + Carousel.loopedSlides,
        0,
        Carousel.params.runCallbacksOnInit,
        false,
        true,
      );
    } else {
      Carousel.slideTo(Carousel.params.initialSlide, 0, Carousel.params.runCallbacksOnInit, false, true);
    }

    // Attach events
    Carousel.attachEvents();

    // Init Flag
    Carousel.initialized = true;

    // Emit
    Carousel.emit('init');
    Carousel.emit('afterInit');

    return Carousel;
  }

  destroy(deleteInstance = true, cleanStyles = true) {
    const Carousel = this;
    const { params, $el, $wrapperEl, slides } = Carousel;

    if (typeof Carousel.params === 'undefined' || Carousel.destroyed) {
      return null;
    }

    Carousel.emit('beforeDestroy');

    // Init Flag
    Carousel.initialized = false;

    // Detach events
    Carousel.detachEvents();

    // Destroy loop
    if (params.loop) {
      Carousel.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      Carousel.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass(
            [
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass,
            ].join(' '),
          )
          .removeAttr('style')
          .removeAttr('data-Carousel-slide-index');
      }
    }

    Carousel.emit('destroy');

    // Detach emitter events
    Object.keys(Carousel.eventsListeners).forEach((eventName) => {
      Carousel.off(eventName);
    });

    if (deleteInstance !== false) {
      Carousel.$el[0].Carousel = null;
      deleteProps(Carousel);
    }
    Carousel.destroyed = true;

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
      module.forEach((m) => Carousel.installModule(m));
      return Carousel;
    }
    Carousel.installModule(module);
    return Carousel;
  }
}

Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Carousel.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});

Carousel.use([Resize, Observer, Autoplay, Navigation, Pagination]);

export default Carousel;
