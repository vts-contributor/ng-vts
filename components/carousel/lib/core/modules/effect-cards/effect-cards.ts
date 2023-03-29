//@ts-nocheck
import createShadow from '../../../shared/create-shadow';
import effectInit from '../../../shared/effect-init';
import effectTarget from '../../../shared/effect-target';
import effectVirtualTransitionEnd from '../../../shared/effect-virtual-transition-end';

export default function EffectCards({ carousel, extendParams, on }) {
  extendParams({
    cardsEffect: {
      slideShadows: true,
      transformEl: null,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });

  const setTranslate = () => {
    const { slides, activeIndex } = carousel;
    const params = carousel.params.cardsEffect;
    const { startTranslate, isTouched } = carousel.touchEventsData;
    const currentTranslate = carousel.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideProgress = $slideEl[0].progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = $slideEl[0].carouselSlideOffset;
      if (carousel.params.centeredSlides && !carousel.params.cssMode) {
        carousel.$wrapperEl.transform(`translateX(${carousel.minTranslate()}px)`);
      }
      if (carousel.params.centeredSlides && carousel.params.cssMode) {
        offset -= slides[0].carouselSlideOffset;
      }
      let tX = carousel.params.cssMode ? -offset - carousel.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -params.perSlideRotate * progress;

      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;

      const slideIndex =
        carousel.virtual && carousel.params.virtual.enabled ? carousel.virtual.from + i : i;

      const isSwipeToNext =
        (slideIndex === activeIndex || slideIndex === activeIndex - 1) &&
        progress > 0 &&
        progress < 1 &&
        (isTouched || carousel.params.cssMode) &&
        currentTranslate < startTranslate;
      const isSwipeToPrev =
        (slideIndex === activeIndex || slideIndex === activeIndex + 1) &&
        progress < 0 &&
        progress > -1 &&
        (isTouched || carousel.params.cssMode) &&
        currentTranslate > startTranslate;

      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${-25 * subProgress * Math.abs(progress)}%`;
      }

      if (progress < 0) {
        // next
        tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        // prev
        tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!carousel.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }

      const scaleString =
        progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;

      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rotate : 0}deg)
        scale(${scaleString})
      `;

      if (params.slideShadows) {
        // Set shadows
        let $shadowEl = $slideEl.find('.vts-carousel-slide-shadow');
        if ($shadowEl.length === 0) {
          $shadowEl = createShadow(params, $slideEl);
        }
        if ($shadowEl.length)
          $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const $targetEl = effectTarget(params, $slideEl);
      $targetEl.transform(transform);
    }
  };

  const setTransition = duration => {
    const { transformEl } = carousel.params.cardsEffect;
    const $transitionElements = transformEl ? carousel.slides.find(transformEl) : carousel.slides;
    $transitionElements
      .transition(duration)
      .find('.vts-carousel-slide-shadow')
      .transition(duration);

    effectVirtualTransitionEnd({ carousel, duration, transformEl });
  };

  effectInit({
    effect: 'cards',
    carousel,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !carousel.params.cssMode
    })
  });
}
