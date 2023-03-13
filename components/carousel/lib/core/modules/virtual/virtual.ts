//@ts-nocheck
import $ from '../../../shared/dom';
import { setCSSProperty } from '../../../shared/utils';

export default function Virtual({ carousel, extendParams, on, emit }) {
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });

  let cssModeTimeout;

  carousel.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };

  function renderSlide(slide, index) {
    const params = carousel.params.virtual;
    if (params.cache && carousel.virtual.cache[index]) {
      return carousel.virtual.cache[index];
    }
    const $slideEl = params.renderSlide
      ? $(params.renderSlide.call(carousel, slide, index))
      : $(
          `<div class="${carousel.params.slideClass}" data-carousel-slide-index="${index}">${slide}</div>`
        );
    if (!$slideEl.attr('data-carousel-slide-index'))
      $slideEl.attr('data-carousel-slide-index', index);
    if (params.cache) carousel.virtual.cache[index] = $slideEl;
    return $slideEl;
  }

  function update(force) {
    const { slidesPerView, slidesPerGroup, centeredSlides } = carousel.params;
    const { addSlidesBefore, addSlidesAfter } = carousel.params.virtual;
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset
    } = carousel.virtual;
    if (!carousel.params.cssMode) {
      carousel.updateActiveIndex();
    }

    const activeIndex = carousel.activeIndex || 0;

    let offsetProp;
    if (carousel.rtlTranslate) offsetProp = 'right';
    else offsetProp = carousel.isHorizontal() ? 'left' : 'top';

    let slidesAfter;
    let slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = slidesPerGroup + addSlidesBefore;
    }
    const from = Math.max((activeIndex || 0) - slidesBefore, 0);
    const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    const offset = (carousel.slidesGrid[from] || 0) - (carousel.slidesGrid[0] || 0);

    Object.assign(carousel.virtual, {
      from,
      to,
      offset,
      slidesGrid: carousel.slidesGrid
    });

    function onRendered() {
      carousel.updateSlides();
      carousel.updateProgress();
      carousel.updateSlidesClasses();
      if (carousel.lazy && carousel.params.lazy.enabled) {
        carousel.lazy.load();
      }
      emit('virtualUpdate');
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (carousel.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        carousel.slides.css(offsetProp, `${offset}px`);
      }
      carousel.updateProgress();
      emit('virtualUpdate');
      return;
    }
    if (carousel.params.virtual.renderExternal) {
      carousel.params.virtual.renderExternal.call(carousel, {
        offset,
        from,
        to,
        slides: (function getSlides() {
          const slidesToRender = [];
          for (let i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        })()
      });
      if (carousel.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    const prependIndexes = [];
    const appendIndexes = [];
    if (force) {
      carousel.$wrapperEl.find(`.${carousel.params.slideClass}`).remove();
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          carousel.$wrapperEl
            .find(`.${carousel.params.slideClass}[data-carousel-slide-index="${i}"]`)
            .remove();
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      if (i >= from && i <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(i);
        } else {
          if (i > previousTo) appendIndexes.push(i);
          if (i < previousFrom) prependIndexes.push(i);
        }
      }
    }
    appendIndexes.forEach(index => {
      carousel.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes
      .sort((a, b) => b - a)
      .forEach(index => {
        carousel.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
    carousel.$wrapperEl.children('.vts-carousel-slide').css(offsetProp, `${offset}px`);
    onRendered();
  }

  function appendSlide(slides) {
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) carousel.virtual.slides.push(slides[i]);
      }
    } else {
      carousel.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    const activeIndex = carousel.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;

    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) carousel.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      carousel.virtual.slides.unshift(slides);
    }
    if (carousel.params.virtual.cache) {
      const cache = carousel.virtual.cache;
      const newCache = {};
      Object.keys(cache).forEach(cachedIndex => {
        const $cachedEl = cache[cachedIndex];
        const cachedElIndex = $cachedEl.attr('data-carousel-slide-index');
        if (cachedElIndex) {
          $cachedEl.attr(
            'data-carousel-slide-index',
            parseInt(cachedElIndex, 10) + numberOfNewSlides
          );
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
      });
      carousel.virtual.cache = newCache;
    }
    update(true);
    carousel.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    let activeIndex = carousel.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        carousel.virtual.slides.splice(slidesIndexes[i], 1);
        if (carousel.params.virtual.cache) {
          delete carousel.virtual.cache[slidesIndexes[i]];
        }
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      carousel.virtual.slides.splice(slidesIndexes, 1);
      if (carousel.params.virtual.cache) {
        delete carousel.virtual.cache[slidesIndexes];
      }
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    carousel.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    carousel.virtual.slides = [];
    if (carousel.params.virtual.cache) {
      carousel.virtual.cache = {};
    }
    update(true);
    carousel.slideTo(0, 0);
  }

  on('beforeInit', () => {
    if (!carousel.params.virtual.enabled) return;
    carousel.virtual.slides = carousel.params.virtual.slides;
    carousel.classNames.push(`${carousel.params.containerModifierClass}virtual`);

    carousel.params.watchSlidesProgress = true;
    carousel.originalParams.watchSlidesProgress = true;

    if (!carousel.params.initialSlide) {
      update();
    }
  });
  on('setTranslate', () => {
    if (!carousel.params.virtual.enabled) return;
    if (carousel.params.cssMode && !carousel._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', () => {
    if (!carousel.params.virtual.enabled) return;
    if (carousel.params.cssMode) {
      setCSSProperty(carousel.wrapperEl, '--carousel-virtual-size', `${carousel.virtualSize}px`);
    }
  });

  Object.assign(carousel.virtual, {
    appendSlide,
    prependSlide,
    removeSlide,
    removeAllSlides,
    update
  });
}
