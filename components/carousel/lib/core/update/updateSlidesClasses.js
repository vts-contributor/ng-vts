export default function updateSlidesClasses() {
  const Carousel = this;

  const { slides, params, $wrapperEl, activeIndex, realIndex } = Carousel;
  const isVirtual = Carousel.virtual && params.virtual.enabled;

  slides.removeClass(
    `${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`,
  );

  let activeSlide;
  if (isVirtual) {
    activeSlide = Carousel.$wrapperEl.find(
      `.${params.slideClass}[data-Carousel-slide-index="${activeIndex}"]`,
    );
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(
          `.${params.slideClass}:not(.${params.slideDuplicateClass})[data-Carousel-slide-index="${realIndex}"]`,
        )
        .addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl
        .children(
          `.${params.slideClass}.${params.slideDuplicateClass}[data-Carousel-slide-index="${realIndex}"]`,
        )
        .addClass(params.slideDuplicateActiveClass);
    }
  }
  // Next Slide
  let nextSlide = activeSlide
    .nextAll(`.${params.slideClass}`)
    .eq(0)
    .addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  // Prev Slide
  let prevSlide = activeSlide
    .prevAll(`.${params.slideClass}`)
    .eq(0)
    .addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(
          `.${params.slideClass}:not(.${
            params.slideDuplicateClass
          })[data-Carousel-slide-index="${nextSlide.attr('data-Carousel-slide-index')}"]`,
        )
        .addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl
        .children(
          `.${params.slideClass}.${
            params.slideDuplicateClass
          }[data-Carousel-slide-index="${nextSlide.attr('data-Carousel-slide-index')}"]`,
        )
        .addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(
          `.${params.slideClass}:not(.${
            params.slideDuplicateClass
          })[data-Carousel-slide-index="${prevSlide.attr('data-Carousel-slide-index')}"]`,
        )
        .addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl
        .children(
          `.${params.slideClass}.${
            params.slideDuplicateClass
          }[data-Carousel-slide-index="${prevSlide.attr('data-Carousel-slide-index')}"]`,
        )
        .addClass(params.slideDuplicatePrevClass);
    }
  }
  Carousel.emitSlidesClasses();
}
