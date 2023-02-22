import Swiper from 'swiper';

export const calcLoopedSlides = (slides, swiperParams) => {
  let vtsSlidesPerViewParams = swiperParams.vtsSlidesPerView;
  if (swiperParams.breakpoints) {
    const breakpoint = Swiper.prototype.getBreakpoint(swiperParams.breakpoints);
    const breakpointOnlyParams =
      breakpoint in swiperParams.breakpoints ? swiperParams.breakpoints[breakpoint] : undefined;
    if (breakpointOnlyParams && breakpointOnlyParams.vtsSlidesPerView) {
      vtsSlidesPerViewParams = breakpointOnlyParams.vtsSlidesPerView;
    }
  }
  let loopedSlides = Math.ceil(parseFloat(swiperParams.loopedSlides || vtsSlidesPerViewParams, 10));

  loopedSlides += swiperParams.loopAdditionalSlides;

  if (loopedSlides > slides.length && swiperParams.loopedSlidesLimit) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
};
