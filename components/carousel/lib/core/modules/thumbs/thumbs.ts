//@ts-nocheck
import { isObject } from '../../../shared/utils';
import $ from '../../../shared/dom';

export default function Thumb({ carousel, extendParams, on }) {
  extendParams({
    thumbs: {
      carousel: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'vts-carousel-slide-thumb-active',
      thumbsContainerClass: 'vts-carousel-thumbs'
    }
  });

  let initialized = false;
  let carouselCreated = false;

  carousel.thumbs = {
    carousel: null
  };

  function onThumbClick() {
    const thumbscarousel = carousel.thumbs.carousel;
    if (!thumbscarousel || thumbscarousel.destroyed) return;

    const clickedIndex = thumbscarousel.clickedIndex;
    const clickedSlide = thumbscarousel.clickedSlide;
    if (clickedSlide && $(clickedSlide).hasClass(carousel.params.thumbs.slideThumbActiveClass))
      return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    let slideToIndex;
    if (thumbscarousel.params.loop) {
      slideToIndex = parseInt($(thumbscarousel.clickedSlide).attr('data-carousel-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (carousel.params.loop) {
      let currentIndex = carousel.activeIndex;
      if (carousel.slides.eq(currentIndex).hasClass(carousel.params.slideDuplicateClass)) {
        carousel.loopFix();
        // eslint-disable-next-line
        carousel._clientLeft = carousel.$wrapperEl[0].clientLeft;
        currentIndex = carousel.activeIndex;
      }
      const prevIndex = carousel.slides
        .eq(currentIndex)
        .prevAll(`[data-carousel-slide-index="${slideToIndex}"]`)
        .eq(0)
        .index();
      const nextIndex = carousel.slides
        .eq(currentIndex)
        .nextAll(`[data-carousel-slide-index="${slideToIndex}"]`)
        .eq(0)
        .index();
      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;
      else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;
      else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;
      else slideToIndex = prevIndex;
    }
    carousel.slideTo(slideToIndex);
  }

  function init() {
    const { thumbs: thumbsParams } = carousel.params;
    if (initialized) return false;
    initialized = true;
    const carouselClass = carousel.constructor;
    if (thumbsParams.carousel instanceof carouselClass) {
      carousel.thumbs.carousel = thumbsParams.carousel;
      Object.assign(carousel.thumbs.carousel.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(carousel.thumbs.carousel.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
    } else if (isObject(thumbsParams.carousel)) {
      const thumbscarouselParams = Object.assign({}, thumbsParams.carousel);
      Object.assign(thumbscarouselParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      carousel.thumbs.carousel = new carouselClass(thumbscarouselParams);
      carouselCreated = true;
    }
    carousel.thumbs.carousel.$el.addClass(carousel.params.thumbs.thumbsContainerClass);
    carousel.thumbs.carousel.on('tap', onThumbClick);
    return true;
  }

  function update(initial) {
    const thumbscarousel = carousel.thumbs.carousel;
    if (!thumbscarousel || thumbscarousel.destroyed) return;

    const slidesPerView =
      thumbscarousel.params.slidesPerView === 'auto'
        ? thumbscarousel.slidesPerViewDynamic()
        : thumbscarousel.params.slidesPerView;

    // Activate thumbs
    let thumbsToActivate = 1;
    const thumbActiveClass = carousel.params.thumbs.slideThumbActiveClass;

    if (carousel.params.slidesPerView > 1 && !carousel.params.centeredSlides) {
      thumbsToActivate = carousel.params.slidesPerView;
    }

    if (!carousel.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }

    thumbsToActivate = Math.floor(thumbsToActivate);

    thumbscarousel.slides.removeClass(thumbActiveClass);
    if (
      thumbscarousel.params.loop ||
      (thumbscarousel.params.virtual && thumbscarousel.params.virtual.enabled)
    ) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbscarousel.$wrapperEl
          .children(`[data-carousel-slide-index="${carousel.realIndex + i}"]`)
          .addClass(thumbActiveClass);
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbscarousel.slides.eq(carousel.realIndex + i).addClass(thumbActiveClass);
      }
    }

    const autoScrollOffset = carousel.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbscarousel.params.loop;
    if (carousel.realIndex !== thumbscarousel.realIndex || useOffset) {
      let currentThumbsIndex = thumbscarousel.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbscarousel.params.loop) {
        if (
          thumbscarousel.slides
            .eq(currentThumbsIndex)
            .hasClass(thumbscarousel.params.slideDuplicateClass)
        ) {
          thumbscarousel.loopFix();
          // eslint-disable-next-line
          thumbscarousel._clientLeft = thumbscarousel.$wrapperEl[0].clientLeft;
          currentThumbsIndex = thumbscarousel.activeIndex;
        }
        // Find actual thumbs index to slide to
        const prevThumbsIndex = thumbscarousel.slides
          .eq(currentThumbsIndex)
          .prevAll(`[data-carousel-slide-index="${carousel.realIndex}"]`)
          .eq(0)
          .index();
        const nextThumbsIndex = thumbscarousel.slides
          .eq(currentThumbsIndex)
          .nextAll(`[data-carousel-slide-index="${carousel.realIndex}"]`)
          .eq(0)
          .index();
        if (typeof prevThumbsIndex === 'undefined') {
          newThumbsIndex = nextThumbsIndex;
        } else if (typeof nextThumbsIndex === 'undefined') {
          newThumbsIndex = prevThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex =
            thumbscarousel.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = nextThumbsIndex;
        } else {
          newThumbsIndex = prevThumbsIndex;
        }
        direction = carousel.activeIndex > carousel.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = carousel.realIndex;
        direction = newThumbsIndex > carousel.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }

      if (
        thumbscarousel.visibleSlidesIndexes &&
        thumbscarousel.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0
      ) {
        if (thumbscarousel.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (
          newThumbsIndex > currentThumbsIndex &&
          thumbscarousel.params.slidesPerGroup === 1
        ) {
          // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }
        thumbscarousel.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }

  on('beforeInit', () => {
    const { thumbs } = carousel.params;
    if (!thumbs || !thumbs.carousel) return;
    init();
    update(true);
  });
  on('slideChange update resize observerUpdate', () => {
    update();
  });
  on('setTransition', (_s, duration) => {
    const thumbscarousel = carousel.thumbs.carousel;
    if (!thumbscarousel || thumbscarousel.destroyed) return;
    thumbscarousel.setTransition(duration);
  });
  on('beforeDestroy', () => {
    const thumbscarousel = carousel.thumbs.carousel;
    if (!thumbscarousel || thumbscarousel.destroyed) return;
    if (carouselCreated) {
      thumbscarousel.destroy();
    }
  });

  Object.assign(carousel.thumbs, {
    init,
    update
  });
}
