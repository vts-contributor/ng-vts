//@ts-nocheck
import { extend } from '../../shared/utils';

const isGridEnabled = (carousel, params) => {
  return carousel.grid && params.grid && params.grid.rows > 1;
};

export default function setBreakpoint() {
  const carousel = this;
  const { activeIndex, initialized, loopedSlides = 0, params, $el } = carousel;
  const breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return;

  // Get breakpoint for window width and update parameters
  const breakpoint = carousel.getBreakpoint(
    breakpoints,
    carousel.params.breakpointsBase,
    carousel.el
  );

  if (!breakpoint || carousel.currentBreakpoint === breakpoint) return;

  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  const breakpointParams = breakpointOnlyParams || carousel.originalParams;
  const wasMultiRow = isGridEnabled(carousel, params);
  const isMultiRow = isGridEnabled(carousel, breakpointParams);

  const wasEnabled = params.enabled;

  if (wasMultiRow && !isMultiRow) {
    $el.removeClass(
      `${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`
    );
    carousel.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    $el.addClass(`${params.containerModifierClass}grid`);
    if (
      (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column') ||
      (!breakpointParams.grid.fill && params.grid.fill === 'column')
    ) {
      $el.addClass(`${params.containerModifierClass}grid-column`);
    }
    carousel.emitContainerClasses();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      carousel[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      carousel[prop].enable();
    }
  });

  const directionChanged =
    breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop;
  // const needsReLoop =
  //   params.loop &&
  //   (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

  if (directionChanged && initialized) {
    carousel.changeDirection(breakpointParams.direction);
  }
  extend(carousel.params, breakpointParams);

  const isEnabled = carousel.params.enabled;

  Object.assign(carousel, {
    allowTouchMove: carousel.params.allowTouchMove,
    allowSlideNext: carousel.params.allowSlideNext,
    allowSlidePrev: carousel.params.allowSlidePrev
  });

  if (wasEnabled && !isEnabled) {
    carousel.disable();
  } else if (!wasEnabled && isEnabled) {
    carousel.enable();
  }

  carousel.currentBreakpoint = breakpoint;

  carousel.emit('_beforeBreakpoint', breakpointParams);

  if (initialized && needsReLoop) {
    carousel.loopDestroy();
    carousel.loopCreate();
    carousel.updateSlides();
    carousel.slideTo(activeIndex - loopedSlides + carousel.loopedSlides, 0, false);
  }

  carousel.emit('breakpoint', breakpointParams);
}
