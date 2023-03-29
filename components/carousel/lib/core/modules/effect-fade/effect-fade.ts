//@ts-nocheck
import effectInit from '../../../shared/effect-init';
import effectTarget from '../../../shared/effect-target';
import effectVirtualTransitionEnd from '../../../shared/effect-virtual-transition-end';

export default function EffectFade({ carousel, extendParams, on }) {
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null
    }
  });

  const setTranslate = () => {
    const { slides } = carousel;
    const params = carousel.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = carousel.slides.eq(i);
      const offset = $slideEl[0].carouselSlideOffset;
      let tx = -offset;
      if (!carousel.params.virtualTranslate) tx -= carousel.translate;
      let ty = 0;
      if (!carousel.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = carousel.params.fadeEffect.crossFade
        ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
        : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);

      const $targetEl = effectTarget(params, $slideEl);
      $targetEl
        .css({
          opacity: slideOpacity
        })
        .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
    }
  };
  const setTransition = duration => {
    const { transformEl } = carousel.params.fadeEffect;
    const $transitionElements = transformEl ? carousel.slides.find(transformEl) : carousel.slides;
    $transitionElements.transition(duration);
    effectVirtualTransitionEnd({ carousel, duration, transformEl, allSlides: true });
  };

  effectInit({
    effect: 'fade',
    carousel,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !carousel.params.cssMode
    })
  });
}
