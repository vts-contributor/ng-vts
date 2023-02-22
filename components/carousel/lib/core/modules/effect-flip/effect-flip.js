import $ from '../../shared/dom.js';
import createShadow from '../../shared/create-shadow.js';
import effectInit from '../../shared/effect-init.js';
import effectTarget from '../../shared/effect-target.js';
import effectVirtualTransitionEnd from '../../shared/effect-virtual-transition-end.js';

export default function EffectFlip({ Carousel, extendParams, on }) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null,
    },
  });

  const createSlideShadows = ($slideEl, progress, params) => {
    let shadowBefore = Carousel.isHorizontal()
      ? $slideEl.find('.Carousel-slide-shadow-left')
      : $slideEl.find('.Carousel-slide-shadow-top');
    let shadowAfter = Carousel.isHorizontal()
      ? $slideEl.find('.Carousel-slide-shadow-right')
      : $slideEl.find('.Carousel-slide-shadow-bottom');
    if (shadowBefore.length === 0) {
      shadowBefore = createShadow(params, $slideEl, Carousel.isHorizontal() ? 'left' : 'top');
    }
    if (shadowAfter.length === 0) {
      shadowAfter = createShadow(params, $slideEl, Carousel.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  };

  const recreateShadows = () => {
    // Set shadows
    const params = Carousel.params.flipEffect;
    Carousel.slides.each((slideEl) => {
      const $slideEl = $(slideEl);
      let progress = $slideEl[0].progress;
      if (Carousel.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows($slideEl, progress, params);
    });
  };

  const setTranslate = () => {
    const { slides, rtlTranslate: rtl } = Carousel;
    const params = Carousel.params.flipEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let progress = $slideEl[0].progress;
      if (Carousel.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      const offset = $slideEl[0].CarouselSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = Carousel.params.cssMode ? -offset - Carousel.translate : -offset;
      let ty = 0;
      if (!Carousel.isHorizontal()) {
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

  const setTransition = (duration) => {
    const { transformEl } = Carousel.params.flipEffect;
    const $transitionElements = transformEl ? Carousel.slides.find(transformEl) : Carousel.slides;
    $transitionElements
      .transition(duration)
      .find(
        '.Carousel-slide-shadow-top, .Carousel-slide-shadow-right, .Carousel-slide-shadow-bottom, .Carousel-slide-shadow-left',
      )
      .transition(duration);
    effectVirtualTransitionEnd({ Carousel, duration, transformEl });
  };

  effectInit({
    effect: 'flip',
    Carousel,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => Carousel.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      vtsSlidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      vtsSpaceBetween: 0,
      virtualTranslate: !Carousel.params.cssMode,
    }),
  });
}
