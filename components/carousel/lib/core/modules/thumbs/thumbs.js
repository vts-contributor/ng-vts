import { isObject } from '../../shared/utils.js';
import $ from '../../shared/dom.js';

export default function Thumb({ Carousel, extendParams, on }) {
  extendParams({
    thumbs: {
      Carousel: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'Carousel-slide-thumb-active',
      thumbsContainerClass: 'Carousel-thumbs',
    },
  });

  let initialized = false;
  let CarouselCreated = false;

  Carousel.thumbs = {
    Carousel: null,
  };

  function onThumbClick() {
    const thumbsCarousel = Carousel.thumbs.Carousel;
    if (!thumbsCarousel || thumbsCarousel.destroyed) return;

    const clickedIndex = thumbsCarousel.clickedIndex;
    const clickedSlide = thumbsCarousel.clickedSlide;
    if (clickedSlide && $(clickedSlide).hasClass(Carousel.params.thumbs.slideThumbActiveClass))
      return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    let slideToIndex;
    if (thumbsCarousel.params.loop) {
      slideToIndex = parseInt($(thumbsCarousel.clickedSlide).attr('data-Carousel-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (Carousel.params.loop) {
      let currentIndex = Carousel.activeIndex;
      if (Carousel.slides.eq(currentIndex).hasClass(Carousel.params.slideDuplicateClass)) {
        Carousel.loopFix();
        // eslint-disable-next-line
        Carousel._clientLeft = Carousel.$wrapperEl[0].clientLeft;
        currentIndex = Carousel.activeIndex;
      }
      const prevIndex = Carousel.slides
        .eq(currentIndex)
        .prevAll(`[data-Carousel-slide-index="${slideToIndex}"]`)
        .eq(0)
        .index();
      const nextIndex = Carousel.slides
        .eq(currentIndex)
        .nextAll(`[data-Carousel-slide-index="${slideToIndex}"]`)
        .eq(0)
        .index();
      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;
      else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;
      else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;
      else slideToIndex = prevIndex;
    }
    Carousel.slideTo(slideToIndex);
  }

  function init() {
    const { thumbs: thumbsParams } = Carousel.params;
    if (initialized) return false;
    initialized = true;
    const CarouselClass = Carousel.constructor;
    if (thumbsParams.Carousel instanceof CarouselClass) {
      Carousel.thumbs.Carousel = thumbsParams.Carousel;
      Object.assign(Carousel.thumbs.Carousel.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false,
      });
      Object.assign(Carousel.thumbs.Carousel.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false,
      });
    } else if (isObject(thumbsParams.Carousel)) {
      const thumbsCarouselParams = Object.assign({}, thumbsParams.Carousel);
      Object.assign(thumbsCarouselParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false,
      });
      Carousel.thumbs.Carousel = new CarouselClass(thumbsCarouselParams);
      CarouselCreated = true;
    }
    Carousel.thumbs.Carousel.$el.addClass(Carousel.params.thumbs.thumbsContainerClass);
    Carousel.thumbs.Carousel.on('tap', onThumbClick);
    return true;
  }

  function update(initial) {
    const thumbsCarousel = Carousel.thumbs.Carousel;
    if (!thumbsCarousel || thumbsCarousel.destroyed) return;

    const vtsSlidesPerView =
      thumbsCarousel.params.vtsSlidesPerView === 'auto'
        ? thumbsCarousel.slidesPerViewDynamic()
        : thumbsCarousel.params.vtsSlidesPerView;

    // Activate thumbs
    let thumbsToActivate = 1;
    const thumbActiveClass = Carousel.params.thumbs.slideThumbActiveClass;

    if (Carousel.params.vtsSlidesPerView > 1 && !Carousel.params.centeredSlides) {
      thumbsToActivate = Carousel.params.vtsSlidesPerView;
    }

    if (!Carousel.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }

    thumbsToActivate = Math.floor(thumbsToActivate);

    thumbsCarousel.slides.removeClass(thumbActiveClass);
    if (
      thumbsCarousel.params.loop ||
      (thumbsCarousel.params.virtual && thumbsCarousel.params.virtual.enabled)
    ) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbsCarousel.$wrapperEl
          .children(`[data-Carousel-slide-index="${Carousel.realIndex + i}"]`)
          .addClass(thumbActiveClass);
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        thumbsCarousel.slides.eq(Carousel.realIndex + i).addClass(thumbActiveClass);
      }
    }

    const autoScrollOffset = Carousel.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsCarousel.params.loop;
    if (Carousel.realIndex !== thumbsCarousel.realIndex || useOffset) {
      let currentThumbsIndex = thumbsCarousel.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbsCarousel.params.loop) {
        if (
          thumbsCarousel.slides
            .eq(currentThumbsIndex)
            .hasClass(thumbsCarousel.params.slideDuplicateClass)
        ) {
          thumbsCarousel.loopFix();
          // eslint-disable-next-line
          thumbsCarousel._clientLeft = thumbsCarousel.$wrapperEl[0].clientLeft;
          currentThumbsIndex = thumbsCarousel.activeIndex;
        }
        // Find actual thumbs index to slide to
        const prevThumbsIndex = thumbsCarousel.slides
          .eq(currentThumbsIndex)
          .prevAll(`[data-Carousel-slide-index="${Carousel.realIndex}"]`)
          .eq(0)
          .index();
        const nextThumbsIndex = thumbsCarousel.slides
          .eq(currentThumbsIndex)
          .nextAll(`[data-Carousel-slide-index="${Carousel.realIndex}"]`)
          .eq(0)
          .index();
        if (typeof prevThumbsIndex === 'undefined') {
          newThumbsIndex = nextThumbsIndex;
        } else if (typeof nextThumbsIndex === 'undefined') {
          newThumbsIndex = prevThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex =
            thumbsCarousel.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = nextThumbsIndex;
        } else {
          newThumbsIndex = prevThumbsIndex;
        }
        direction = Carousel.activeIndex > Carousel.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = Carousel.realIndex;
        direction = newThumbsIndex > Carousel.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }

      if (
        thumbsCarousel.visibleSlidesIndexes &&
        thumbsCarousel.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0
      ) {
        if (thumbsCarousel.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(vtsSlidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(vtsSlidesPerView / 2) - 1;
          }
        } else if (
          newThumbsIndex > currentThumbsIndex &&
          thumbsCarousel.params.slidesPerGroup === 1
        ) {
          // newThumbsIndex = newThumbsIndex - vtsSlidesPerView + 1;
        }
        thumbsCarousel.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }

  on('beforeInit', () => {
    const { thumbs } = Carousel.params;
    if (!thumbs || !thumbs.Carousel) return;
    init();
    update(true);
  });
  on('slideChange update resize observerUpdate', () => {
    update();
  });
  on('setTransition', (_s, duration) => {
    const thumbsCarousel = Carousel.thumbs.Carousel;
    if (!thumbsCarousel || thumbsCarousel.destroyed) return;
    thumbsCarousel.setTransition(duration);
  });
  on('beforeDestroy', () => {
    const thumbsCarousel = Carousel.thumbs.Carousel;
    if (!thumbsCarousel || thumbsCarousel.destroyed) return;
    if (CarouselCreated) {
      thumbsCarousel.destroy();
    }
  });

  Object.assign(Carousel.thumbs, {
    init,
    update,
  });
}
