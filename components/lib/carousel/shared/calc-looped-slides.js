import carousel from 'vts-carousel';

export const calcLoopedSlides = (slides, carouselParams) => {
  let vtsSlidesPerViewParams = carouselParams.vtsSlidesPerView;
  if (carouselParams.vtsBreakpoints) {
    const breakpoint = carousel.prototype.getBreakpoint(carouselParams.vtsBreakpoints);
    const breakpointOnlyParams =
      breakpoint in carouselParams.vtsBreakpoints ? carouselParams.vtsBreakpoints[breakpoint] : undefined;
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
