import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom.js';

export default function HashNavigation({ Carousel, extendParams, emit, on }) {
  let initialized = false;
  const document = getDocument();
  const window = getWindow();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
    },
  });
  const onHashChange = () => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideHash = Carousel.slides.eq(Carousel.activeIndex).attr('data-hash');
    if (newHash !== activeSlideHash) {
      const newIndex = Carousel.$wrapperEl
        .children(`.${Carousel.params.slideClass}[data-hash="${newHash}"]`)
        .index();
      if (typeof newIndex === 'undefined') return;
      Carousel.slideTo(newIndex);
    }
  };
  const setHash = () => {
    if (!initialized || !Carousel.params.hashNavigation.enabled) return;
    if (
      Carousel.params.hashNavigation.replaceState &&
      window.history &&
      window.history.replaceState
    ) {
      window.history.replaceState(
        null,
        null,
        `#${Carousel.slides.eq(Carousel.activeIndex).attr('data-hash')}` || '',
      );
      emit('hashSet');
    } else {
      const slide = Carousel.slides.eq(Carousel.activeIndex);
      const hash = slide.attr('data-hash') || slide.attr('data-history');
      document.location.hash = hash || '';
      emit('hashSet');
    }
  };
  const init = () => {
    if (
      !Carousel.params.hashNavigation.enabled ||
      (Carousel.params.history && Carousel.params.history.enabled)
    )
      return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      for (let i = 0, length = Carousel.slides.length; i < length; i += 1) {
        const slide = Carousel.slides.eq(i);
        const slideHash = slide.attr('data-hash') || slide.attr('data-history');
        if (slideHash === hash && !slide.hasClass(Carousel.params.slideDuplicateClass)) {
          const index = slide.index();
          Carousel.slideTo(index, speed, Carousel.params.runCallbacksOnInit, true);
        }
      }
    }
    if (Carousel.params.hashNavigation.watchState) {
      $(window).on('hashchange', onHashChange);
    }
  };
  const destroy = () => {
    if (Carousel.params.hashNavigation.watchState) {
      $(window).off('hashchange', onHashChange);
    }
  };

  on('init', () => {
    if (Carousel.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (Carousel.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', () => {
    if (initialized && Carousel.params.cssMode) {
      setHash();
    }
  });
}
