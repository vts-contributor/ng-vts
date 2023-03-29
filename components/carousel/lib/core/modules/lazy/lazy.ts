//@ts-nocheck
import { getWindow } from 'ssr-window';
import $ from '../../../shared/dom';

export default function Lazy({ carousel, extendParams, on, emit }) {
  extendParams({
    lazy: {
      checkInView: false,
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,
      scrollingElement: '',

      elementClass: 'vts-carousel-lazy',
      loadingClass: 'vts-carousel-lazy-loading',
      loadedClass: 'vts-carousel-lazy-loaded',
      preloaderClass: 'vts-carousel-lazy-preloader'
    }
  });

  carousel.lazy = {};

  let scrollHandlerAttached = false;
  let initialImageLoaded = false;

  function loadInSlide(index, loadInDuplicate = true) {
    const params = carousel.params.lazy;
    if (typeof index === 'undefined') return;
    if (carousel.slides.length === 0) return;
    const isVirtual = carousel.virtual && carousel.params.virtual.enabled;

    const $slideEl = isVirtual
      ? carousel.$wrapperEl.children(
          `.${carousel.params.slideClass}[data-carousel-slide-index="${index}"]`
        )
      : carousel.slides.eq(index);

    const $images = $slideEl.find(
      `.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`
    );
    if (
      $slideEl.hasClass(params.elementClass) &&
      !$slideEl.hasClass(params.loadedClass) &&
      !$slideEl.hasClass(params.loadingClass)
    ) {
      $images.push($slideEl[0]);
    }
    if ($images.length === 0) return;

    $images.each(imageEl => {
      const $imageEl = $(imageEl);
      $imageEl.addClass(params.loadingClass);

      const background = $imageEl.attr('data-background');
      const src = $imageEl.attr('data-src');
      const srcset = $imageEl.attr('data-srcset');
      const sizes = $imageEl.attr('data-sizes');
      const $pictureEl = $imageEl.parent('picture');

      carousel.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
        if (
          typeof carousel === 'undefined' ||
          carousel === null ||
          !carousel ||
          (carousel && !carousel.params) ||
          carousel.destroyed
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
            $pictureEl.children('source').each(sourceEl => {
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
        if (carousel.params.loop && loadInDuplicate) {
          const slideOriginalIndex = $slideEl.attr('data-carousel-slide-index');
          if ($slideEl.hasClass(carousel.params.slideDuplicateClass)) {
            const originalSlide = carousel.$wrapperEl.children(
              `[data-carousel-slide-index="${slideOriginalIndex}"]:not(.${carousel.params.slideDuplicateClass})`
            );
            loadInSlide(originalSlide.index(), false);
          } else {
            const duplicatedSlide = carousel.$wrapperEl.children(
              `.${carousel.params.slideDuplicateClass}[data-carousel-slide-index="${slideOriginalIndex}"]`
            );
            loadInSlide(duplicatedSlide.index(), false);
          }
        }
        emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        if (carousel.params.autoHeight) {
          carousel.updateAutoHeight();
        }
      });

      emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  }

  function load() {
    const { $wrapperEl, params: carouselParams, slides, activeIndex } = carousel;
    const isVirtual = carousel.virtual && carouselParams.virtual.enabled;
    const params = carouselParams.lazy;

    let slidesPerView = carouselParams.slidesPerView;
    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if (
          $wrapperEl.children(`.${carouselParams.slideClass}[data-carousel-slide-index="${index}"]`)
            .length
        ) {
          return true;
        }
      } else if (slides[index]) return true;
      return false;
    }

    function slideIndex(slideEl) {
      if (isVirtual) {
        return $(slideEl).attr('data-carousel-slide-index');
      }
      return $(slideEl).index();
    }

    if (!initialImageLoaded) initialImageLoaded = true;
    if (carousel.params.watchSlidesProgress) {
      $wrapperEl.children(`.${carouselParams.slideVisibleClass}`).each(slideEl => {
        const index = isVirtual ? $(slideEl).attr('data-carousel-slide-index') : $(slideEl).index();
        loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) loadInSlide(i);
      }
    } else {
      loadInSlide(activeIndex);
    }
    if (params.loadPrevNext) {
      if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
        const amount = params.loadPrevNextAmount;
        const spv = Math.ceil(slidesPerView);
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
        const nextSlide = $wrapperEl.children(`.${carouselParams.slideNextClass}`);
        if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));

        const prevSlide = $wrapperEl.children(`.${carouselParams.slidePrevClass}`);
        if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
      }
    }
  }
  function checkInViewOnLoad() {
    const window = getWindow();
    if (!carousel || carousel.destroyed) return;
    const $scrollElement = carousel.params.lazy.scrollingElement
      ? $(carousel.params.lazy.scrollingElement)
      : $(window);
    const isWindow = $scrollElement[0] === window;
    const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
    const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
    const carouselOffset = carousel.$el.offset();
    const { rtlTranslate: rtl } = carousel;

    let inView = false;

    if (rtl) carouselOffset.left -= carousel.$el[0].scrollLeft;
    const carouselCoord = [
      [carouselOffset.left, carouselOffset.top],
      [carouselOffset.left + carousel.width, carouselOffset.top],
      [carouselOffset.left, carouselOffset.top + carousel.height],
      [carouselOffset.left + carousel.width, carouselOffset.top + carousel.height]
    ];
    for (let i = 0; i < carouselCoord.length; i += 1) {
      const point = carouselCoord[i];
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
      carousel.touchEvents.start === 'touchstart' &&
      carousel.support.passiveListener &&
      carousel.params.passiveListeners
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
    if (carousel.params.lazy.enabled && carousel.params.preloadImages) {
      carousel.params.preloadImages = false;
    }
  });
  on('init', () => {
    if (carousel.params.lazy.enabled) {
      if (carousel.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('scroll', () => {
    if (
      carousel.params.freeMode &&
      carousel.params.freeMode.enabled &&
      !carousel.params.freeMode.sticky
    ) {
      load();
    }
  });
  on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
    if (carousel.params.lazy.enabled) {
      if (carousel.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('transitionStart', () => {
    if (carousel.params.lazy.enabled) {
      if (
        carousel.params.lazy.loadOnTransitionStart ||
        (!carousel.params.lazy.loadOnTransitionStart && !initialImageLoaded)
      ) {
        if (carousel.params.lazy.checkInView) {
          checkInViewOnLoad();
        } else {
          load();
        }
      }
    }
  });
  on('transitionEnd', () => {
    if (carousel.params.lazy.enabled && !carousel.params.lazy.loadOnTransitionStart) {
      if (carousel.params.lazy.checkInView) {
        checkInViewOnLoad();
      } else {
        load();
      }
    }
  });
  on('slideChange', () => {
    const { lazy, cssMode, watchSlidesProgress, touchReleaseOnEdges, resistanceRatio } =
      carousel.params;
    if (
      lazy.enabled &&
      (cssMode || (watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0)))
    ) {
      load();
    }
  });

  on('destroy', () => {
    if (!carousel.$el) return;
    carousel.$el
      .find(`.${carousel.params.lazy.loadingClass}`)
      .removeClass(carousel.params.lazy.loadingClass);
  });

  Object.assign(carousel.lazy, {
    load,
    loadInSlide
  });
}
