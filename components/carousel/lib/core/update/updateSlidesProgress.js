import $ from '../../shared/dom.js';

export default function updateSlidesProgress(translate = (this && this.translate) || 0) {
  const Carousel = this;
  const params = Carousel.params;

  const { slides, rtlTranslate: rtl, snapGrid } = Carousel;

  if (slides.length === 0) return;
  if (typeof slides[0].CarouselSlideOffset === 'undefined') Carousel.updateSlidesOffset();

  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate;

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  Carousel.visibleSlidesIndexes = [];
  Carousel.visibleSlides = [];

  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    let slideOffset = slide.CarouselSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].CarouselSlideOffset;
    }

    const slideProgress =
      (offsetCenter + (params.centeredSlides ? Carousel.minTranslate() : 0) - slideOffset) /
      (slide.CarouselSlideSize + params.vtsSpaceBetween);
    const originalSlideProgress =
      (offsetCenter -
        snapGrid[0] +
        (params.centeredSlides ? Carousel.minTranslate() : 0) -
        slideOffset) /
      (slide.CarouselSlideSize + params.vtsSpaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + Carousel.slidesSizesGrid[i];
    const isVisible =
      (slideBefore >= 0 && slideBefore < Carousel.size - 1) ||
      (slideAfter > 1 && slideAfter <= Carousel.size) ||
      (slideBefore <= 0 && slideAfter >= Carousel.size);
    if (isVisible) {
      Carousel.visibleSlides.push(slide);
      Carousel.visibleSlidesIndexes.push(i);
      slides.eq(i).addClass(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
  Carousel.visibleSlides = $(Carousel.visibleSlides);
}
