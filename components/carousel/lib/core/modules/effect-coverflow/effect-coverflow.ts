//@ts-nocheck
import createShadow from '../../../shared/create-shadow';
import effectInit from '../../../shared/effect-init';
import effectTarget from '../../../shared/effect-target';

export default function EffectCoverflow({ carousel, extendParams, on }) {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
      transformEl: null
    }
  });

  const setTranslate = () => {
    const { width: carouselWidth, height: carouselHeight, slides, slidesSizesGrid } = carousel;
    const params = carousel.params.coverflowEffect;
    const isHorizontal = carousel.isHorizontal();
    const transform = carousel.translate;
    const center = isHorizontal ? -transform + carouselWidth / 2 : -transform + carouselHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const $slideEl = slides.eq(i);
      const slideSize = slidesSizesGrid[i];
      const slideOffset = $slideEl[0].carouselSlideOffset;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier =
        typeof params.modifier === 'function'
          ? params.modifier(centerOffset)
          : centerOffset * params.modifier;

      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      let translateZ = -translate * Math.abs(offsetMultiplier);

      let stretch = params.stretch;
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = (parseFloat(params.stretch) / 100) * slideSize;
      }
      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;

      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;

      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      const $targetEl = effectTarget(params, $slideEl);
      $targetEl.transform(slideTransform);

      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

      if (params.slideShadows) {
        // Set shadows
        let $shadowBeforeEl = isHorizontal
          ? $slideEl.find('.vts-carousel-slide-shadow-left')
          : $slideEl.find('.vts-carousel-slide-shadow-top');
        let $shadowAfterEl = isHorizontal
          ? $slideEl.find('.vts-carousel-slide-shadow-right')
          : $slideEl.find('.vts-carousel-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
        }
        if ($shadowBeforeEl.length)
          $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if ($shadowAfterEl.length)
          $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  const setTransition = duration => {
    const { transformEl } = carousel.params.coverflowEffect;
    const $transitionElements = transformEl ? carousel.slides.find(transformEl) : carousel.slides;
    $transitionElements
      .transition(duration)
      .find(
        '.vts-carousel-slide-shadow-top, .carousel-slide-shadow-right, .carousel-slide-shadow-bottom, .carousel-slide-shadow-left'
      )
      .transition(duration);
  };

  effectInit({
    effect: 'coverflow',
    carousel,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}
