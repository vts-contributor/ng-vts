/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
import { getDocument } from 'ssr-window';
import { nextTick } from '../../../shared/utils.js';

export default function Autoplay({ Carousel, extendParams, on, emit }) {
  let timeout;

  Carousel.autoplay = {
    running: false,
    paused: false,
  };

  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false,
    },
  });

  function run() {
    if (!Carousel.size) {
      Carousel.autoplay.running = false;
      Carousel.autoplay.paused = false;
      return;
    }
    const $activeSlideEl = Carousel.slides.eq(Carousel.activeIndex);
    let delay = Carousel.params.autoplay.delay;
    if ($activeSlideEl.attr('data-Carousel-autoplay')) {
      delay = $activeSlideEl.attr('data-Carousel-autoplay') || Carousel.params.autoplay.delay;
    }
    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;
      if (Carousel.params.autoplay.reverseDirection) {
        if (Carousel.params.loop) {
          Carousel.loopFix();
          autoplayResult = Carousel.slidePrev(Carousel.params.speed, true, true);
          emit('autoplay');
        } else if (!Carousel.isBeginning) {
          autoplayResult = Carousel.slidePrev(Carousel.params.speed, true, true);
          emit('autoplay');
        } else if (!Carousel.params.autoplay.stopOnLastSlide) {
          autoplayResult = Carousel.slideTo(
            Carousel.slides.length - 1,
            Carousel.params.speed,
            true,
            true,
          );
          emit('autoplay');
        } else {
          stop();
        }
      } else if (Carousel.params.loop) {
        Carousel.loopFix();
        autoplayResult = Carousel.slideNext(Carousel.params.speed, true, true);
        emit('autoplay');
      } else if (!Carousel.isEnd) {
        autoplayResult = Carousel.slideNext(Carousel.params.speed, true, true);
        emit('autoplay');
      } else if (!Carousel.params.autoplay.stopOnLastSlide) {
        autoplayResult = Carousel.slideTo(0, Carousel.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }
      if (Carousel.params.cssMode && Carousel.autoplay.running) run();
      else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (Carousel.autoplay.running) return false;
    Carousel.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }
  function stop() {
    if (!Carousel.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    Carousel.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }
  function pause(speed) {
    if (!Carousel.autoplay.running) return;
    if (Carousel.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    Carousel.autoplay.paused = true;
    if (speed === 0 || !Carousel.params.autoplay.waitForTransition) {
      Carousel.autoplay.paused = false;
      run();
    } else {
      ['transitionend', 'webkitTransitionEnd'].forEach((event) => {
        Carousel.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    const document = getDocument();
    if (document.visibilityState === 'hidden' && Carousel.autoplay.running) {
      pause();
    }
    if (document.visibilityState === 'visible' && Carousel.autoplay.paused) {
      run();
      Carousel.autoplay.paused = false;
    }
  }
  function onTransitionEnd(e) {
    if (!Carousel || Carousel.destroyed || !Carousel.$wrapperEl) return;
    if (e.target !== Carousel.$wrapperEl[0]) return;
    ['transitionend', 'webkitTransitionEnd'].forEach((event) => {
      Carousel.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    Carousel.autoplay.paused = false;
    if (!Carousel.autoplay.running) {
      stop();
    } else {
      run();
    }
  }
  function onMouseEnter() {
    if (Carousel.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      emit('autoplayPause');
      pause();
    }

    ['transitionend', 'webkitTransitionEnd'].forEach((event) => {
      Carousel.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
  }
  function onMouseLeave() {
    if (Carousel.params.autoplay.disableOnInteraction) {
      return;
    }
    Carousel.autoplay.paused = false;
    emit('autoplayResume');
    run();
  }
  function attachMouseEvents() {
    if (Carousel.params.autoplay.pauseOnMouseEnter) {
      Carousel.$el.on('mouseenter', onMouseEnter);
      Carousel.$el.on('mouseleave', onMouseLeave);
    }
  }
  function detachMouseEvents() {
    Carousel.$el.off('mouseenter', onMouseEnter);
    Carousel.$el.off('mouseleave', onMouseLeave);
  }

  on('init', () => {
    if (Carousel.params.autoplay.enabled) {
      start();
      const document = getDocument();
      document.addEventListener('visibilitychange', onVisibilityChange);
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (Carousel.autoplay.running) {
      if (internal || !Carousel.params.autoplay.disableOnInteraction) {
        Carousel.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on('sliderFirstMove', () => {
    if (Carousel.autoplay.running) {
      if (Carousel.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touchEnd', () => {
    if (
      Carousel.params.cssMode &&
      Carousel.autoplay.paused &&
      !Carousel.params.autoplay.disableOnInteraction
    ) {
      run();
    }
  });
  on('destroy', () => {
    detachMouseEvents();
    if (Carousel.autoplay.running) {
      stop();
    }
    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });

  Object.assign(Carousel.autoplay, {
    pause,
    run,
    start,
    stop,
  });
}
