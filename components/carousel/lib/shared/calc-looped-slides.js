import Carousel from 'Carousel';

export const calcLoopedSlides = (slides, CarouselParams) => {
  let vtsSlidesPerViewParams = CarouselParams.vtsSlidesPerView;
  if (CarouselParams.breakpoints) {
    const breakpoint = Carousel.prototype.getBreakpoint(CarouselParams.breakpoints);
    const breakpointOnlyParams =
      breakpoint in CarouselParams.breakpoints ? CarouselParams.breakpoints[breakpoint] : undefined;
    if (breakpointOnlyParams && breakpointOnlyParams.vtsSlidesPerView) {
      vtsSlidesPerViewParams = breakpointOnlyParams.vtsSlidesPerView;
    }
  }
  let loopedSlides = Math.ceil(parseFloat(CarouselParams.loopedSlides || vtsSlidesPerViewParams, 10));

  loopedSlides += CarouselParams.loopAdditionalSlides;

  if (loopedSlides > slides.length && CarouselParams.loopedSlidesLimit) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
};
