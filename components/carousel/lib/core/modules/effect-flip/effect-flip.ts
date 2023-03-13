//@ts-nocheck
import $ from '../../../shared/dom';
import createShadow from '../../../shared/create-shadow';
import effectInit from '../../../shared/effect-init';
import effectTarget from '../../../shared/effect-target';
import effectVirtualTransitionEnd from '../../../shared/effect-virtual-transition-end';

export default function EffectFlip({ carousel, extendParams, on }) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null
    }
  });

  const createSlideShadows = ($slideEl, progress, params) => {
    let shadowBefore = carousel.isHorizontal()
      ? $slideEl.find('.vts-carousel-slide-shadow-left')
      : $slideEl.find('.vts-carousel-slide-shadow-top');
    let shadowAfter = carousel.isHorizontal()
      ? $slideEl.find('.vts-carousel-slide-shadow-right')
      : $slideEl.find('.vts-carousel-slide-shadow-bottom');
    if (shadowBefore.length === 0) {
      shadowBefore = createShadow(params, $slideEl, carousel.isHorizontal() ? 'left' : 'top');
    }
    if (shadowAfter.length === 0) {
      shadowAfter = createShadow(params, $slideEl, carousel.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  };

  const recreateShadows = () => {
    // Set shadows
    const params = carousel.params.flipEffect;
    carousel.slides.each(slideEl => {
      const $slideEl = $(slideEl);
      let progress = $slideEl[0].progress;
      if (carousel.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows($slideEl, progress, params);
    });
  };

  const setTranslate = () => {
    const { slides, rtlTranslate: rtl } = carousel;
    const params = carousel.params.flipEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let progress = $slideEl[0].progress;
      if (carousel.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      const offset = $slideEl[0].carouselSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = carousel.params.cssMode ? -offset - carousel.translate : -offset;
      let ty = 0;
      if (!carousel.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (params.slideShadows) {
        createSlideShadows($slideEl, progress, params);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const $targetEl = effectTarget(params, $slideEl);
      $targetEl.transform(transform);
    }
  };

  const setTransition = duration => {
    const { transformEl } = carousel.params.flipEffect;
    const $transitionElements = transformEl ? carousel.slides.find(transformEl) : carousel.slides;
    $transitionElements
      .transition(duration)
      .find(
        '.vts-carousel-slide-shadow-top, .carousel-slide-shadow-right, .carousel-slide-shadow-bottom, .carousel-slide-shadow-left'
      )
      .transition(duration);
    effectVirtualTransitionEnd({ carousel, duration, transformEl });
  };

  effectInit({
    effect: 'flip',
    carousel,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => carousel.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !carousel.params.cssMode
    })
  });
}
