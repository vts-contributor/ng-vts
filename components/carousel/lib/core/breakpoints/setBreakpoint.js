import { extend } from '../../shared/utils.js';

const isGridEnabled = (Carousel, params) => {
  return Carousel.grid && params.grid && params.grid.rows > 1;
};

export default function setBreakpoint() {
  const Carousel = this;
  const { activeIndex, initialized, loopedSlides = 0, params, $el } = Carousel;
  const breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return;

  // Get breakpoint for window width and update parameters
  const breakpoint = Carousel.getBreakpoint(breakpoints, Carousel.params.breakpointsBase, Carousel.el);

  if (!breakpoint || Carousel.currentBreakpoint === breakpoint) return;

  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  const breakpointParams = breakpointOnlyParams || Carousel.originalParams;
  const wasMultiRow = isGridEnabled(Carousel, params);
  const isMultiRow = isGridEnabled(Carousel, breakpointParams);

  const wasEnabled = params.enabled;

  if (wasMultiRow && !isMultiRow) {
    $el.removeClass(
      `${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`,
    );
    Carousel.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    $el.addClass(`${params.containerModifierClass}grid`);
    if (
      (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column') ||
      (!breakpointParams.grid.fill && params.grid.fill === 'column')
    ) {
      $el.addClass(`${params.containerModifierClass}grid-column`);
    }
    Carousel.emitContainerClasses();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach((prop) => {
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      Carousel[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      Carousel[prop].enable();
    }
  });

  const directionChanged =
    breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop =
    params.loop && (breakpointParams.vtsSlidesPerView !== params.vtsSlidesPerView || directionChanged);

  if (directionChanged && initialized) {
    Carousel.changeDirection();
  }
  extend(Carousel.params, breakpointParams);

  const isEnabled = Carousel.params.enabled;

  Object.assign(Carousel, {
    allowTouchMove: Carousel.params.allowTouchMove,
    allowSlideNext: Carousel.params.allowSlideNext,
    allowSlidePrev: Carousel.params.allowSlidePrev,
  });

  if (wasEnabled && !isEnabled) {
    Carousel.disable();
  } else if (!wasEnabled && isEnabled) {
    Carousel.enable();
  }

  Carousel.currentBreakpoint = breakpoint;

  Carousel.emit('_beforeBreakpoint', breakpointParams);

  if (needsReLoop && initialized) {
    Carousel.loopDestroy();
    Carousel.loopCreate();
    Carousel.updateSlides();
    Carousel.slideTo(activeIndex - loopedSlides + Carousel.loopedSlides, 0, false);
  }

  Carousel.emit('breakpoint', breakpointParams);
}
