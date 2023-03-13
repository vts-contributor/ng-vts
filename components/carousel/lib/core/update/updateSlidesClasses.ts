//@ts-nocheck
export default function updateSlidesClasses() {
  const carousel = this;

  const { slides, params, $wrapperEl, activeIndex, realIndex } = carousel;
  const isVirtual = carousel.virtual && params.virtual.enabled;

  slides.removeClass(
    `${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`
  );

  let activeSlide;
  if (isVirtual) {
    activeSlide = carousel.$wrapperEl.find(
      `.${params.slideClass}[data-carousel-slide-index="${activeIndex}"]`
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
          `.${params.slideClass}:not(.${params.slideDuplicateClass})[data-carousel-slide-index="${realIndex}"]`
        )
        .addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl
        .children(
          `.${params.slideClass}.${params.slideDuplicateClass}[data-carousel-slide-index="${realIndex}"]`
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
          })[data-carousel-slide-index="${nextSlide.attr('data-carousel-slide-index')}"]`
        )
        .addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl
        .children(
          `.${params.slideClass}.${
            params.slideDuplicateClass
          }[data-carousel-slide-index="${nextSlide.attr('data-carousel-slide-index')}"]`
        )
        .addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(
          `.${params.slideClass}:not(.${
            params.slideDuplicateClass
          })[data-carousel-slide-index="${prevSlide.attr('data-carousel-slide-index')}"]`
        )
        .addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl
        .children(
          `.${params.slideClass}.${
            params.slideDuplicateClass
          }[data-carousel-slide-index="${prevSlide.attr('data-carousel-slide-index')}"]`
        )
        .addClass(params.slideDuplicatePrevClass);
    }
  }
  carousel.emitSlidesClasses();
}
