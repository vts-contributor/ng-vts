export default function effectInit(params) {
  const {
    effect,
    Carousel,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams,
  } = params;

  on('beforeInit', () => {
    if (Carousel.params.effect !== effect) return;
    Carousel.classNames.push(`${Carousel.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      Carousel.classNames.push(`${Carousel.params.containerModifierClass}3d`);
    }

    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};

    Object.assign(Carousel.params, overwriteParamsResult);
    Object.assign(Carousel.originalParams, overwriteParamsResult);
  });
  on('setTranslate', () => {
    if (Carousel.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (Carousel.params.effect !== effect) return;
    setTransition(duration);
  });

  on('transitionEnd', () => {
    if (Carousel.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      Carousel.slides.each((slideEl) => {
        const $slideEl = Carousel.$(slideEl);
        $slideEl
          .find(
            '.Carousel-slide-shadow-top, .Carousel-slide-shadow-right, .Carousel-slide-shadow-bottom, .Carousel-slide-shadow-left',
          )
          .remove();
      });
      // create new one
      recreateShadows();
    }
  });

  let requireUpdateOnVirtual;
  on('virtualUpdate', () => {
    if (Carousel.params.effect !== effect) return;
    if (!Carousel.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && Carousel.slides && Carousel.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}
