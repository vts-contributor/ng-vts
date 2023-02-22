import effectInit from '../../shared/effect-init.js';
import effectTarget from '../../shared/effect-target.js';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end.js';

export default function EffectFade({ Carousel, extendParams, on }) {
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null,
    },
  });

  const setTranslate = () => {
    const { slides } = Carousel;
    const params = Carousel.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = Carousel.slides.eq(i);
      const offset = $slideEl[0].CarouselSlideOffset;
      let tx = -offset;
      if (!Carousel.params.virtualTranslate) tx -= Carousel.translate;
      let ty = 0;
      if (!Carousel.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = Carousel.params.fadeEffect.crossFade
        ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
        : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);

      const $targetEl = effectTarget(params, $slideEl);
      $targetEl
        .css({
          opacity: slideOpacity,
        })
        .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
    }
  };
  const setTransition = (duration) => {
    const { transformEl } = Carousel.params.fadeEffect;
    const $transitionElements = transformEl ? Carousel.slides.find(transformEl) : Carousel.slides;
    $transitionElements.transition(duration);
    effectVirtualTransitionEnd({ Carousel, duration, transformEl, allSlides: true });
  };

  effectInit({
    effect: 'fade',
    Carousel,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      vtsSlidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      vtsSpaceBetween: 0,
      virtualTranslate: !Carousel.params.cssMode,
    }),
  });
}
