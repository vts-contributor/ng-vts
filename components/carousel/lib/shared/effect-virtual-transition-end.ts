//@ts-nocheck
export default function effectVirtualTransitionEnd({ carousel, duration, transformEl, allSlides }) {
  const { slides, activeIndex, $wrapperEl } = carousel;
  if (carousel.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let $transitionEndTarget;
    if (allSlides) {
      $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
    } else {
      $transitionEndTarget = transformEl
        ? slides.eq(activeIndex).find(transformEl)
        : slides.eq(activeIndex);
    }
    $transitionEndTarget.transitionEnd(() => {
      if (eventTriggered) return;
      if (!carousel || carousel.destroyed) return;
      eventTriggered = true;
      carousel.animating = false;
      const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
      for (let i = 0; i < triggerEvents.length; i += 1) {
        $wrapperEl.trigger(triggerEvents[i]);
      }
    });
  }
}
