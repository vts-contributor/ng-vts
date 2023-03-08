//@ts-nocheck
/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
import { getDocument } from 'ssr-window';
import { nextTick } from '../../../shared/utils';

export default function Autoplay({ carousel, extendParams, on, emit }) {
  let timeout;

  carousel.vtsAutoplay = {
    running: false,
    paused: false
  };

  extendParams({
    vtsAutoplay: {
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
      carousel.vtsAutoplay.running = false;
      carousel.vtsAutoplay.paused = false;
      return;
    }
    const $activeSlideEl = carousel.slides.eq(carousel.activeIndex);
    let delay = carousel.params.vtsAutoplay.delay;
    if ($activeSlideEl.attr('data-carousel-autoplay')) {
      delay = $activeSlideEl.attr('data-carousel-autoplay') || carousel.params.vtsAutoplay.delay;
    }
    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;
      if (carousel.params.vtsAutoplay.reverseDirection) {
        if (carousel.params.vtsLoop) {
          carousel.loopFix();
          autoplayResult = carousel.slidePrev(carousel.params.vtsSpeed, true, true);
          emit('autoplay');
        } else if (!carousel.isBeginning) {
          autoplayResult = carousel.slidePrev(carousel.params.vtsSpeed, true, true);
          emit('autoplay');
        } else if (!carousel.params.vtsAutoplay.stopOnLastSlide) {
          autoplayResult = carousel.slideTo(
            carousel.slides.length - 1,
            carousel.params.vtsSpeed,
            true,
            true
          );
          emit('autoplay');
        } else {
          stop();
        }
      } else if (carousel.params.vtsLoop) {
        carousel.loopFix();
        autoplayResult = carousel.slideNext(carousel.params.vtsSpeed, true, true);
        emit('autoplay');
      } else if (!carousel.isEnd) {
        autoplayResult = carousel.slideNext(carousel.params.vtsSpeed, true, true);
        emit('autoplay');
      } else if (!carousel.params.vtsAutoplay.stopOnLastSlide) {
        autoplayResult = carousel.slideTo(0, carousel.params.vtsSpeed, true, true);
        emit('autoplay');
      } else {
        stop();
      }
      if (carousel.params.cssMode && carousel.vtsAutoplay.running) run();
      else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (carousel.vtsAutoplay.running) return false;
    carousel.vtsAutoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }
  function stop() {
    if (!carousel.vtsAutoplay.running) return false;
    if (typeof timeout === 'undefined') return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    carousel.vtsAutoplay.running = false;
    emit('autoplayStop');
    return true;
  }
  function pause(speed) {
    if (!carousel.vtsAutoplay.running) return;
    if (carousel.vtsAutoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    carousel.vtsAutoplay.paused = true;
    if (speed === 0 || !carousel.params.vtsAutoplay.waitForTransition) {
      carousel.vtsAutoplay.paused = false;
      run();
    } else {
      ['transitionend', 'webkitTransitionEnd'].forEach(event => {
        carousel.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    const document = getDocument();
    if (document.visibilityState === 'hidden' && carousel.vtsAutoplay.running) {
      pause();
    }
    if (document.visibilityState === 'visible' && carousel.vtsAutoplay.paused) {
      run();
      carousel.vtsAutoplay.paused = false;
    }
  }
  function onTransitionEnd(e) {
    if (!carousel || carousel.destroyed || !carousel.$wrapperEl) return;
    if (e.target !== carousel.$wrapperEl[0]) return;
    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      carousel.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    carousel.vtsAutoplay.paused = false;
    if (!carousel.vtsAutoplay.running) {
      stop();
    } else {
      run();
    }
  }
  function onMouseEnter() {
    if (carousel.params.vtsAutoplay.disableOnInteraction) {
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
    if (carousel.params.vtsAutoplay.disableOnInteraction) {
      return;
    }
    carousel.vtsAutoplay.paused = false;
    emit('autoplayResume');
    run();
  }
  function attachMouseEvents() {
    if (carousel.params.vtsAutoplay.pauseOnMouseEnter) {
      carousel.$el.on('mouseenter', onMouseEnter);
      carousel.$el.on('mouseleave', onMouseLeave);
    }
  }
  function detachMouseEvents() {
    carousel.$el.off('mouseenter', onMouseEnter);
    carousel.$el.off('mouseleave', onMouseLeave);
  }

  on('init', () => {
    if (carousel.params.vtsAutoplay.enabled) {
      start();
      const document = getDocument();
      document.addEventListener('visibilitychange', onVisibilityChange);
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (carousel.vtsAutoplay.running) {
      if (internal || !carousel.params.vtsAutoplay.disableOnInteraction) {
        carousel.vtsAutoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on('sliderFirstMove', () => {
    if (carousel.vtsAutoplay.running) {
      if (carousel.params.vtsAutoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touchEnd', () => {
    if (
      carousel.params.cssMode &&
      carousel.vtsAutoplay.paused &&
      !carousel.params.vtsAutoplay.disableOnInteraction
    ) {
      run();
    }
  });
  on('destroy', () => {
    detachMouseEvents();
    if (carousel.vtsAutoplay.running) {
      stop();
    }
    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  Object.assign(carousel.vtsAutoplay, {
    pause,
    run,
    start,
    stop
  });
}
