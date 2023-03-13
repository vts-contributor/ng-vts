//@ts-nocheck
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../../shared/dom';

export default function HashNavigation({ carousel, extendParams, emit, on }) {
  let initialized = false;
  const document = getDocument();
  const window = getWindow();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false
    }
  });
  const onHashChange = () => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideHash = carousel.slides.eq(carousel.activeIndex).attr('data-hash');
    if (newHash !== activeSlideHash) {
      const newIndex = carousel.$wrapperEl
        .children(`.${carousel.params.slideClass}[data-hash="${newHash}"]`)
        .index();
      if (typeof newIndex === 'undefined') return;
      carousel.slideTo(newIndex);
    }
  };
  const setHash = () => {
    if (!initialized || !carousel.params.hashNavigation.enabled) return;
    if (
      carousel.params.hashNavigation.replaceState &&
      window.history &&
      window.history.replaceState
    ) {
      window.history.replaceState(
        null,
        null,
        `#${carousel.slides.eq(carousel.activeIndex).attr('data-hash')}` || ''
      );
      emit('hashSet');
    } else {
      const slide = carousel.slides.eq(carousel.activeIndex);
      const hash = slide.attr('data-hash') || slide.attr('data-history');
      document.location.hash = hash || '';
      emit('hashSet');
    }
  };
  const init = () => {
    if (
      !carousel.params.hashNavigation.enabled ||
      (carousel.params.history && carousel.params.history.enabled)
    )
      return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      for (let i = 0, length = carousel.slides.length; i < length; i += 1) {
        const slide = carousel.slides.eq(i);
        const slideHash = slide.attr('data-hash') || slide.attr('data-history');
        if (slideHash === hash && !slide.hasClass(carousel.params.slideDuplicateClass)) {
          const index = slide.index();
          carousel.slideTo(index, speed, carousel.params.runCallbacksOnInit, true);
        }
      }
    }
    if (carousel.params.hashNavigation.watchState) {
      $(window).on('hashchange', onHashChange);
    }
  };
  const destroy = () => {
    if (carousel.params.hashNavigation.watchState) {
      $(window).off('hashchange', onHashChange);
    }
  };

  on('init', () => {
    if (carousel.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (carousel.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', () => {
    if (initialized && carousel.params.cssMode) {
      setHash();
    }
  });
}
