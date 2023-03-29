//@ts-nocheck
/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
import { getDocument } from 'ssr-window';
import { nextTick } from '../../../shared/utils';

export default function Autoplay({ carousel, extendParams, on, emit }) {
  let timeout;

  carousel.autoplay = {
    running: false,
    paused: false
  };

  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });

  function run() {
    if (!carousel.size) {
      carousel.autoplay.running = false;
      carousel.autoplay.paused = false;
      return;
    }
    const $activeSlideEl = carousel.slides.eq(carousel.activeIndex);
    let delay = carousel.params.autoplay.delay;
    if ($activeSlideEl.attr('data-carousel-autoplay')) {
      delay = $activeSlideEl.attr('data-carousel-autoplay') || carousel.params.autoplay.delay;
    }
    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;
      if (carousel.params.autoplay.reverseDirection) {
        if (carousel.params.loop) {
          carousel.loopFix();
          autoplayResult = carousel.slidePrev(carousel.params.speed, true, true);
          emit('autoplay');
        } else if (!carousel.isBeginning) {
          autoplayResult = carousel.slidePrev(carousel.params.speed, true, true);
          emit('autoplay');
        } else if (!carousel.params.autoplay.stopOnLastSlide) {
          autoplayResult = carousel.slideTo(
            carousel.slides.length - 1,
            carousel.params.speed,
            true,
            true
          );
          emit('autoplay');
        } else {
          stop();
        }
      } else if (carousel.params.loop) {
        carousel.loopFix();
        autoplayResult = carousel.slideNext(carousel.params.speed, true, true);
        emit('autoplay');
      } else if (!carousel.isEnd) {
        autoplayResult = carousel.slideNext(carousel.params.speed, true, true);
        emit('autoplay');
      } else if (!carousel.params.autoplay.stopOnLastSlide) {
        autoplayResult = carousel.slideTo(0, carousel.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }
      if (carousel.params.cssMode && carousel.autoplay.running) run();
      else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (carousel.autoplay.running) return false;
    carousel.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }
  function stop() {
    if (!carousel.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    carousel.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }
  function pause(speed) {
    if (!carousel.autoplay.running) return;
    if (carousel.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    carousel.autoplay.paused = true;
    if (speed === 0 || !carousel.params.autoplay.waitForTransition) {
      carousel.autoplay.paused = false;
      run();
    } else {
      ['transitionend', 'webkitTransitionEnd'].forEach(event => {
        carousel.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    const document = getDocument();
    if (document.visibilityState === 'hidden' && carousel.autoplay.running) {
      pause();
    }
    if (document.visibilityState === 'visible' && carousel.autoplay.paused) {
      run();
      carousel.autoplay.paused = false;
    }
  }
  function onTransitionEnd(e) {
    if (!carousel || carousel.destroyed || !carousel.$wrapperEl) return;
    if (e.target !== carousel.$wrapperEl[0]) return;
    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      carousel.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    carousel.autoplay.paused = false;
    if (!carousel.autoplay.running) {
      stop();
    } else {
      run();
    }
  }
  function onMouseEnter() {
    if (carousel.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      emit('autoplayPause');
      pause();
    }

    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      carousel.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
  }
  function onMouseLeave() {
    if (carousel.params.autoplay.disableOnInteraction) {
      return;
    }
    carousel.autoplay.paused = false;
    emit('autoplayResume');
    run();
  }
  function attachMouseEvents() {
    if (carousel.params.autoplay.pauseOnMouseEnter) {
      carousel.$el.on('mouseenter', onMouseEnter);
      carousel.$el.on('mouseleave', onMouseLeave);
      carousel.autoplay.pauseOnMouseEnter = true;
    }
  }
  function detachMouseEvents() {
    carousel.$el.off('mouseenter', onMouseEnter);
    carousel.$el.off('mouseleave', onMouseLeave);
    carousel.autoplay.pauseOnMouseEnter = false;
  }

  on('init', () => {
    if (carousel.params.autoplay.enabled) {
      start();
      const document = getDocument();
      document.addEventListener('visibilitychange', onVisibilityChange);
      attachMouseEvents();
    }
  });
  on('update', () => {
    if (!carousel.params.autoplay.enabled && carousel.autoplay.running) {
      stop();
    } else if (carousel.params.autoplay.enabled && !carousel.autoplay.running) {
      start();
    }
    if (!carousel.params.autoplay.pauseOnMouseEnter && carousel.autoplay.pauseOnMouseEnter) {
      detachMouseEvents();
    } else if (carousel.params.autoplay.pauseOnMouseEnter && !carousel.autoplay.pauseOnMouseEnter) {
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (carousel.autoplay.running) {
      if (internal || !carousel.params.autoplay.disableOnInteraction) {
        carousel.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on('sliderFirstMove', () => {
    if (carousel.autoplay.running) {
      if (carousel.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touchEnd', () => {
    if (
      carousel.params.cssMode &&
      carousel.autoplay.paused &&
      !carousel.params.autoplay.disableOnInteraction
    ) {
      run();
    }
  });
  on('destroy', () => {
    detachMouseEvents();
    if (carousel.autoplay.running) {
      stop();
    }
    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  Object.assign(carousel.autoplay, {
    pause,
    run,
    start,
    stop
  });
}
