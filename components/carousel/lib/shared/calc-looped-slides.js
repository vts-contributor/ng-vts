import carousel from 'carousel';

export const calcLoopedSlides = (slides, carouselParams) => {
  let vtsSlidesPerViewParams = carouselParams.vtsSlidesPerView;
  if (carouselParams.breakpoints) {
    const breakpoint = carousel.prototype.getBreakpoint(carouselParams.breakpoints);
    const breakpointOnlyParams =
      breakpoint in carouselParams.breakpoints ? carouselParams.breakpoints[breakpoint] : undefined;
    if (breakpointOnlyParams && breakpointOnlyParams.vtsSlidesPerView) {
      vtsSlidesPerViewParams = breakpointOnlyParams.vtsSlidesPerView;
    }
  }
  let loopedSlides = Math.ceil(parseFloat(carouselParams.loopedSlides || vtsSlidesPerViewParams, 10));

  loopedSlides += carouselParams.loopAdditionalSlides;

  if (loopedSlides > slides.length && carouselParams.loopedSlidesLimit) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
};
