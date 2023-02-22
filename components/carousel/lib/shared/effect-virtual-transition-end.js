export default function effectVirtualTransitionEnd({ Carousel, duration, transformEl, allSlides }) {
  const { slides, activeIndex, $wrapperEl } = Carousel;
  if (Carousel.params.virtualTranslate && duration !== 0) {
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
      if (!Carousel || Carousel.destroyed) return;
      eventTriggered = true;
      Carousel.animating = false;
      const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
      for (let i = 0; i < triggerEvents.length; i += 1) {
        $wrapperEl.trigger(triggerEvents[i]);
      }
    });
  }
}
