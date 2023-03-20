//@ts-nocheck
export default function effectInit(params) {
  const {
    effect,
    carousel,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams,
    containerModifierClass
  } = params;

  on('beforeInit', () => {
    if (carousel.params.effect !== effect) return;
    carousel.classNames.push(`${carousel.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      carousel.classNames.push(`${carousel.params.containerModifierClass}3d`);
    }

    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};

    Object.assign(carousel.params, overwriteParamsResult);
    Object.assign(carousel.originalParams, overwriteParamsResult);
  });
  on('setTranslate', () => {
    if (carousel.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (carousel.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', () => {
    if (carousel.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      carousel.slides.each(slideEl => {
        const $slideEl = carousel.$(slideEl);
        $slideEl
          .find(
            '.vts-carousel-slide-shadow-top, .carousel-slide-shadow-right, .carousel-slide-shadow-bottom, .carousel-slide-shadow-left'
          )
          .remove();
      });
      // create new one
      recreateShadows();
    }
  });

  let requireUpdateOnVirtual;
  on('virtualUpdate', () => {
    if (carousel.params.effect !== effect) return;
    if (!carousel.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && carousel.slides && carousel.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}
