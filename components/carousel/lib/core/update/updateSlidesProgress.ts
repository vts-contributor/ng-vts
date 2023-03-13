//@ts-nocheck
import $ from '../../shared/dom';

export default function updateSlidesProgress(translate = (this && this.translate) || 0) {
  const carousel = this;
  const params = carousel.params;

  const { slides, rtlTranslate: rtl, snapGrid } = carousel;

  if (slides.length === 0) return;
  if (typeof slides[0].carouselSlideOffset === 'undefined') carousel.updateSlidesOffset();

  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate;

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  carousel.visibleSlidesIndexes = [];
  carousel.visibleSlides = [];

  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    let slideOffset = slide.carouselSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].carouselSlideOffset;
    }

    const slideProgress =
      (offsetCenter + (params.centeredSlides ? carousel.minTranslate() : 0) - slideOffset) /
      (slide.carouselSlideSize + params.spaceBetween);
    const originalSlideProgress =
      (offsetCenter -
        snapGrid[0] +
        (params.centeredSlides ? carousel.minTranslate() : 0) -
        slideOffset) /
      (slide.carouselSlideSize + params.spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + carousel.slidesSizesGrid[i];
    const isVisible =
      (slideBefore >= 0 && slideBefore < carousel.size - 1) ||
      (slideAfter > 1 && slideAfter <= carousel.size) ||
      (slideBefore <= 0 && slideAfter >= carousel.size);
    if (isVisible) {
      carousel.visibleSlides.push(slide);
      carousel.visibleSlidesIndexes.push(i);
      slides.eq(i).addClass(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
  carousel.visibleSlides = $(carousel.visibleSlides);
}
