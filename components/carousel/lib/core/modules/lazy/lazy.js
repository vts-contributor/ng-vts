import { getWindow } from 'ssr-window';
import $ from '../../shared/dom.js';

export default function Lazy({ Carousel, extendParams, on, emit }) {
  extendParams({
    lazy: {
      checkInView: false,
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,
      scrollingElement: '',

      elementClass: 'Carousel-lazy',
      loadingClass: 'Carousel-lazy-loading',
      loadedClass: 'Carousel-lazy-loaded',
      preloaderClass: 'Carousel-lazy-preloader',
    },
  });

  Carousel.lazy = {};

  let scrollHandlerAttached = false;
  let initialImageLoaded = false;

  function loadInSlide(index, loadInDuplicate = true) {
    const params = Carousel.params.lazy;
    if (typeof index === 'undefined') return;
    if (Carousel.slides.length === 0) return;
    const isVirtual = Carousel.virtual && Carousel.params.virtual.enabled;

    const $slideEl = isVirtual
      ? Carousel.$wrapperEl.children(
          `.${Carousel.params.slideClass}[data-Carousel-slide-index="${index}"]`,
        )
      : Carousel.slides.eq(index);

    const $images = $slideEl.find(
      `.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`,
    );
    if (
      $slideEl.hasClass(params.elementClass) &&
      !$slideEl.hasClass(params.loadedClass) &&
      !$slideEl.hasClass(params.loadingClass)
    ) {
      $images.push($slideEl[0]);
    }
    if ($images.length === 0) return;

    $images.each((imageEl) => {
      const $imageEl = $(imageEl);
      $imageEl.addClass(params.loadingClass);

      const background = $imageEl.attr('data-background');
      const src = $imageEl.attr('data-src');
      const srcset = $imageEl.attr('data-srcset');
      const sizes = $imageEl.attr('data-sizes');
      const $pictureEl = $imageEl.parent('picture');

      Carousel.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
        if (
          typeof Carousel === 'undefined' ||
          Carousel === null ||
          !Carousel ||
          (Carousel && !Carousel.params) ||
          Carousel.destroyed
        )
          return;
        if (background) {
          $imageEl.css('background-image', `url("${background}")`);
          $imageEl.removeAttr('data-background');
        } else {
          if (srcset) {
            $imageEl.attr('srcset', srcset);
            $imageEl.removeAttr('data-srcset');
          }
          if (sizes) {
            $imageEl.attr('sizes', sizes);
            $imageEl.removeAttr('data-sizes');
          }
          if ($pictureEl.length) {
            $pictureEl.children('source').each((sourceEl) => {
              const $source = $(sourceEl);

              if ($source.attr('data-srcset')) {
                $source.attr('srcset', $source.attr('data-srcset'));
                $source.removeAttr('data-srcset');
              }
            });
          }
          if (src) {
            $imageEl.attr('src', src);
            $imageEl.removeAttr('data-src');
          }
        }

        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
        $slideEl.find(`.${params.preloaderClass}`).remove();
        if (Carousel.params.loop && loadInDuplicate) {
          const slideOriginalIndex = $slideEl.attr('data-Carousel-slide-index');
          if ($slideEl.hasClass(Carousel.params.slideDuplicateClass)) {
            const originalSlide = Carousel.$wrapperEl.children(
              `[data-Carousel-slide-index="${slideOriginalIndex}"]:not(.${Carousel.params.slideDuplicateClass})`,
            );
            loadInSlide(originalSlide.index(), false);
          } else {
            const duplicatedSlide = Carousel.$wrapperEl.children(
              `.${Carousel.params.slideDuplicateClass}[data-Carousel-slide-index="${slideOriginalIndex}"]`,
            );
            loadInSlide(duplicatedSlide.index(), false);
          }
        }
        emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        if (Carousel.params.autoHeight) {
          Carousel.updateAutoHeight();
        }
      });

      emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  }

  function load() {
    const { $wrapperEl, params: CarouselParams, slides, activeIndex } = Carousel;
    const isVirtual = Carousel.virtual && CarouselParams.virtual.enabled;
    const params = CarouselParams.lazy;

    let vtsSlidesPerView = CarouselParams.vtsSlidesPerView;
    if (vtsSlidesPerView === 'auto') {
      vtsSlidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if (
          $wrapperEl.children(`.${CarouselParams.slideClass}[data-Carousel-slide-index="${index}"]`)
            .length
        ) {
          return true;
        }
      } else if (slides[index]) return true;
      return false;
    }

    function slideIndex(slideEl) {
      if (isVirtual) {
        return $(slideEl).attr('data-Carousel-slide-index');
      }
      return $(slideEl).index();
    }

    if (!initialImageLoaded) initialImageLoaded = true;
    if (Carousel.params.watchSlidesProgress) {
      $wrapperEl.children(`.${CarouselParams.slideVisibleClass}`).each((slideEl) => {
        const index = isVirtual ? $(slideEl).attr('data-Carousel-slide-index') : $(slideEl).index();
        loadInSlide(index);
      });
    } else if (vtsSlidesPerView > 1) {
      for (let i = activeIndex; i < activeIndex + vtsSlidesPerView; i += 1) {
        if (slideExist(i)) loadInSlide(i);
      }
    } else {
      loadInSlide(activeIndex);
    }
    if (params.loadPrevNext) {
      if (vtsSlidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
        const amount = params.loadPrevNextAmount;
        const spv = Math.ceil(vtsSlidesPerView);
        const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
        // Next Slides
        for (let i = activeIndex + spv; i < maxIndex; i += 1) {
          if (slideExist(i)) loadInSlide(i);
        }
        // Prev Slides
        for (let i = minIndex; i < activeIndex; i += 1) {
          if (slideExist(i)) loadInSlide(i);
        }
      } else {
        const nextSlide = $wrapperEl.children(`.${CarouselParams.slideNextClass}`);
        if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));

        const prevSlide = $wrapperEl.children(`.${CarouselParams.slidePrevClass}`);
        if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
      }
    }
  }
  function checkInViewOnLoad() {
    const window = getWindow();
    if (!Carousel || Carousel.destroyed) return;
    const $scrollElement = Carousel.params.lazy.scrollingElement
      ? $(Carousel.params.lazy.scrollingElement)
      : $(window);
    const isWindow = $scrollElement[0] === window;
    const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
    const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
    const CarouselOffset = Carousel.$el.offset();
    const { rtlTranslate: rtl } = Carousel;

    let inView = false;

    if (rtl) CarouselOffset.left -= Carousel.$el[0].scrollLeft;
    const CarouselCoord = [
      [CarouselOffset.left, CarouselOffset.top],
      [CarouselOffset.left + Carousel.width, CarouselOffset.top],
      [CarouselOffset.left, CarouselOffset.top + Carousel.height],
      [CarouselOffset.left + Carousel.width, CarouselOffset.top + Carousel.height],
    ];
    for (let i = 0; i < CarouselCoord.length; i += 1) {
      const point = CarouselCoord[i];
      if (
        point[0] >= 0 &&
        point[0] <= scrollElementWidth &&
        point[1] >= 0 &&
        point[1] <= scrollElementHeight
      ) {
        if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
        inView = true;
      }
    }

    const passiveListener =
      Carousel.touchEvents.start === 'touchstart' &&
      Carousel.support.passiveListener &&
      Carousel.params.passiveListeners
        ? { passive: true, capture: false }
        : false;

    if (inView) {
      load();
      $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
    } else if (!scrollHandlerAttached) {
      scrollHandlerAttached = true;
      $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
    }
  }

  on('beforeInit', () => {
    if (Carousel.params.lazy.enabled && Carousel.params.preloadImages) {
      Carousel.params.preloadImages = false;
    }
  });
  on('init', () => {
    if (Carousel.params.lazy.enabled) {
      if (Carousel.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('scroll', () => {
    if (
      Carousel.params.freeMode &&
      Carousel.params.freeMode.enabled &&
      !Carousel.params.freeMode.sticky
    ) {
      load();
    }
  });
  on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
    if (Carousel.params.lazy.enabled) {
      if (Carousel.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('transitionStart', () => {
    if (Carousel.params.lazy.enabled) {
      if (
        Carousel.params.lazy.loadOnTransitionStart ||
        (!Carousel.params.lazy.loadOnTransitionStart && !initialImageLoaded)
      ) {
        if (Carousel.params.lazy.checkInView) {
          checkInViewOnLoad();
        } else {
          load();
        }
      }
    }
  });
  on('transitionEnd', () => {
    if (Carousel.params.lazy.enabled && !Carousel.params.lazy.loadOnTransitionStart) {
      if (Carousel.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('slideChange', () => {
    const { lazy, cssMode, watchSlidesProgress, touchReleaseOnEdges, resistanceRatio } =
      Carousel.params;
    if (
      lazy.enabled &&
      (cssMode || (watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0)))
    ) {
      load();
    }
  });

  on('destroy', () => {
    if (!Carousel.$el) return;
    Carousel.$el
      .find(`.${Carousel.params.lazy.loadingClass}`)
      .removeClass(Carousel.params.lazy.loadingClass);
  });

  Object.assign(Carousel.lazy, {
    load,
    loadInSlide,
  });
}
