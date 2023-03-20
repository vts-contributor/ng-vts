//@ts-nocheck
import { getWindow } from 'ssr-window';

export default function History({ carousel, extendParams, on }) {
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false
    }
  });

  let initialized = false;
  let paths = {};

  const slugify = text => {
    return text
      .toString()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const getPathValues = urlOverride => {
    const window = getWindow();
    let location;
    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }
    const pathArray = location.pathname
      .slice(1)
      .split('/')
      .filter(part => part !== '');
    const total = pathArray.length;
    const key = pathArray[total - 2];
    const value = pathArray[total - 1];
    return { key, value };
  };
  const setHistory = (key, index) => {
    const window = getWindow();
    if (!initialized || !carousel.params.history.enabled) return;
    let location;
    if (carousel.params.url) {
      location = new URL(carousel.params.url);
    } else {
      location = window.location;
    }
    const slide = carousel.slides.eq(index);
    let value = slugify(slide.attr('data-history'));
    if (carousel.params.history.root.length > 0) {
      let root = carousel.params.history.root;
      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
      value = `${root}/${key}/${value}`;
    } else if (!location.pathname.includes(key)) {
      value = `${key}/${value}`;
    }
    if (carousel.params.history.keepQuery) {
      value += location.search;
    }
    const currentState = window.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (carousel.params.history.replaceState) {
      window.history.replaceState({ value }, null, value);
    } else {
      window.history.pushState({ value }, null, value);
    }
  };

  const scrollToSlide = (speed, value, runCallbacks) => {
    if (value) {
      for (let i = 0, length = carousel.slides.length; i < length; i += 1) {
        const slide = carousel.slides.eq(i);
        const slideHistory = slugify(slide.attr('data-history'));
        if (slideHistory === value && !slide.hasClass(carousel.params.slideDuplicateClass)) {
          const index = slide.index();
          carousel.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      carousel.slideTo(0, speed, runCallbacks);
    }
  };

  const setHistoryPopState = () => {
    paths = getPathValues(carousel.params.url);
    scrollToSlide(carousel.params.speed, paths.value, false);
  };

  const init = () => {
    const window = getWindow();
    if (!carousel.params.history) return;
    if (!window.history || !window.history.pushState) {
      carousel.params.history.enabled = false;
      carousel.params.hashNavigation.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(carousel.params.url);
    if (!paths.key && !paths.value) return;
    scrollToSlide(0, paths.value, carousel.params.runCallbacksOnInit);
    if (!carousel.params.history.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  const destroy = () => {
    const window = getWindow();
    if (!carousel.params.history.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };

  on('init', () => {
    if (carousel.params.history.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (carousel.params.history.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHistory(carousel.params.history.key, carousel.activeIndex);
    }
  });
  on('slideChange', () => {
    if (initialized && carousel.params.cssMode) {
      setHistory(carousel.params.history.key, carousel.activeIndex);
    }
  });
}
