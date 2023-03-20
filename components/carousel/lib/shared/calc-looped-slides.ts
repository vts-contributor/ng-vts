//@ts-nocheck
import carousel from 'vts-carousel';

export const calcLoopedSlides = (slides, carouselParams) => {
  let slidesPerViewParams = carouselParams.slidesPerView;
  if (carouselParams.breakpoints) {
    const breakpoint = carousel.prototype.getBreakpoint(carouselParams.breakpoints);
    const breakpointOnlyParams =
      breakpoint in carouselParams.breakpoints ? carouselParams.breakpoints[breakpoint] : undefined;
    if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
      slidesPerViewParams = breakpointOnlyParams.slidesPerView;
    }
  }
  let loopedSlides = Math.ceil(parseFloat(carouselParams.loopedSlides || slidesPerViewParams, 10));

  loopedSlides += carouselParams.loopAdditionalSlides;

  if (loopedSlides > slides.length && carouselParams.loopedSlidesLimit) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
};
