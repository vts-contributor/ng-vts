import $ from '../../shared/dom.js';
import { setCSSProperty } from '../../shared/utils.js';

export default function Virtual({ Carousel, extendParams, on, emit }) {
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0,
    },
  });

  let cssModeTimeout;

  Carousel.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: [],
  };

  function renderSlide(slide, index) {
    const params = Carousel.params.virtual;
    if (params.cache && Carousel.virtual.cache[index]) {
      return Carousel.virtual.cache[index];
    }
    const $slideEl = params.renderSlide
      ? $(params.renderSlide.call(Carousel, slide, index))
      : $(
          `<div class="${Carousel.params.slideClass}" data-Carousel-slide-index="${index}">${slide}</div>`,
        );
    if (!$slideEl.attr('data-Carousel-slide-index')) $slideEl.attr('data-Carousel-slide-index', index);
    if (params.cache) Carousel.virtual.cache[index] = $slideEl;
    return $slideEl;
  }

  function update(force) {
    const { vtsSlidesPerView, slidesPerGroup, centeredSlides } = Carousel.params;
    const { addSlidesBefore, addSlidesAfter } = Carousel.params.virtual;
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset,
    } = Carousel.virtual;
    if (!Carousel.params.cssMode) {
      Carousel.updateActiveIndex();
    }

    const activeIndex = Carousel.activeIndex || 0;

    let offsetProp;
    if (Carousel.rtlTranslate) offsetProp = 'right';
    else offsetProp = Carousel.isHorizontal() ? 'left' : 'top';

    let slidesAfter;
    let slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(vtsSlidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(vtsSlidesPerView / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = vtsSlidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = slidesPerGroup + addSlidesBefore;
    }
    const from = Math.max((activeIndex || 0) - slidesBefore, 0);
    const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    const offset = (Carousel.slidesGrid[from] || 0) - (Carousel.slidesGrid[0] || 0);

    Object.assign(Carousel.virtual, {
      from,
      to,
      offset,
      slidesGrid: Carousel.slidesGrid,
    });

    function onRendered() {
      Carousel.updateSlides();
      Carousel.updateProgress();
      Carousel.updateSlidesClasses();
      if (Carousel.lazy && Carousel.params.lazy.enabled) {
        Carousel.lazy.load();
      }
      emit('virtualUpdate');
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (Carousel.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        Carousel.slides.css(offsetProp, `${offset}px`);
      }
      Carousel.updateProgress();
      emit('virtualUpdate');
      return;
    }
    if (Carousel.params.virtual.renderExternal) {
      Carousel.params.virtual.renderExternal.call(Carousel, {
        offset,
        from,
        to,
        slides: (function getSlides() {
          const slidesToRender = [];
          for (let i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        })(),
      });
      if (Carousel.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    const prependIndexes = [];
    const appendIndexes = [];
    if (force) {
      Carousel.$wrapperEl.find(`.${Carousel.params.slideClass}`).remove();
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          Carousel.$wrapperEl
            .find(`.${Carousel.params.slideClass}[data-Carousel-slide-index="${i}"]`)
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
    appendIndexes.forEach((index) => {
      Carousel.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes
      .sort((a, b) => b - a)
      .forEach((index) => {
        Carousel.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
    Carousel.$wrapperEl.children('.Carousel-slide').css(offsetProp, `${offset}px`);
    onRendered();
  }

  function appendSlide(slides) {
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) Carousel.virtual.slides.push(slides[i]);
      }
    } else {
      Carousel.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    const activeIndex = Carousel.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;

    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) Carousel.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      Carousel.virtual.slides.unshift(slides);
    }
    if (Carousel.params.virtual.cache) {
      const cache = Carousel.virtual.cache;
      const newCache = {};
      Object.keys(cache).forEach((cachedIndex) => {
        const $cachedEl = cache[cachedIndex];
        const cachedElIndex = $cachedEl.attr('data-Carousel-slide-index');
        if (cachedElIndex) {
          $cachedEl.attr(
            'data-Carousel-slide-index',
            parseInt(cachedElIndex, 10) + numberOfNewSlides,
          );
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
      });
      Carousel.virtual.cache = newCache;
    }
    update(true);
    Carousel.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    let activeIndex = Carousel.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        Carousel.virtual.slides.splice(slidesIndexes[i], 1);
        if (Carousel.params.virtual.cache) {
          delete Carousel.virtual.cache[slidesIndexes[i]];
        }
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      Carousel.virtual.slides.splice(slidesIndexes, 1);
      if (Carousel.params.virtual.cache) {
        delete Carousel.virtual.cache[slidesIndexes];
      }
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    Carousel.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    Carousel.virtual.slides = [];
    if (Carousel.params.virtual.cache) {
      Carousel.virtual.cache = {};
    }
    update(true);
    Carousel.slideTo(0, 0);
  }

  on('beforeInit', () => {
    if (!Carousel.params.virtual.enabled) return;
    Carousel.virtual.slides = Carousel.params.virtual.slides;
    Carousel.classNames.push(`${Carousel.params.containerModifierClass}virtual`);

    Carousel.params.watchSlidesProgress = true;
    Carousel.originalParams.watchSlidesProgress = true;

    if (!Carousel.params.initialSlide) {
      update();
    }
  });
  on('setTranslate', () => {
    if (!Carousel.params.virtual.enabled) return;
    if (Carousel.params.cssMode && !Carousel._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', () => {
    if (!Carousel.params.virtual.enabled) return;
    if (Carousel.params.cssMode) {
      setCSSProperty(Carousel.wrapperEl, '--Carousel-virtual-size', `${Carousel.virtualSize}px`);
    }
  });

  Object.assign(Carousel.virtual, {
    appendSlide,
    prependSlide,
    removeSlide,
    removeAllSlides,
    update,
  });
}
