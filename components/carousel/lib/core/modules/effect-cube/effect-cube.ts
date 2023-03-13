//@ts-nocheck
import $ from '../../../shared/dom';
import effectInit from '../../../shared/effect-init';

export default function EffectCube({ carousel, extendParams, on }) {
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });

  const createSlideShadows = ($slideEl, progress, isHorizontal) => {
    let shadowBefore = isHorizontal
      ? $slideEl.find('.vts-carousel-slide-shadow-left')
      : $slideEl.find('.vts-carousel-slide-shadow-top');
    let shadowAfter = isHorizontal
      ? $slideEl.find('.vts-carousel-slide-shadow-right')
      : $slideEl.find('.vts-carousel-slide-shadow-bottom');
    if (shadowBefore.length === 0) {
      shadowBefore = $(
        `<div class="vts-carousel-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`
      );
      $slideEl.append(shadowBefore);
    }
    if (shadowAfter.length === 0) {
      shadowAfter = $(
        `<div class="vts-carousel-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`
      );
      $slideEl.append(shadowAfter);
    }
    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  };

  const recreateShadows = () => {
    // create new ones
    const isHorizontal = carousel.isHorizontal();
    carousel.slides.each(slideEl => {
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows($(slideEl), progress, isHorizontal);
    });
  };

  const setTranslate = () => {
    const {
      $el,
      $wrapperEl,
      slides,
      width: carouselWidth,
      height: carouselHeight,
      rtlTranslate: rtl,
      size: carouselSize,
      browser
    } = carousel;
    const params = carousel.params.cubeEffect;
    const isHorizontal = carousel.isHorizontal();
    const isVirtual = carousel.virtual && carousel.params.virtual.enabled;
    let wrapperRotate = 0;
    let $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = $wrapperEl.find('.vts-carousel-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $('<div class="vts-carousel-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }
        $cubeShadowEl.css({ height: `${carouselWidth}px` });
      } else {
        $cubeShadowEl = $el.find('.vts-carousel-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $('<div class="vts-carousel-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const $slideEl = slides.eq(i);
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt($slideEl.attr('data-carousel-slide-index'), 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * carouselSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * carouselSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = carouselSize + round * 4 * carouselSize;
        tz = carouselSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -carouselSize;
        tz = 3 * carouselSize + carouselSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${
        isHorizontal ? slideAngle : 0
      }deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      $slideEl.transform(transform);
      if (params.slideShadows) {
        createSlideShadows($slideEl, progress, isHorizontal);
      }
    }
    $wrapperEl.css({
      '-webkit-transform-origin': `50% 50% -${carouselSize / 2}px`,
      'transform-origin': `50% 50% -${carouselSize / 2}px`
    });

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl.transform(
          `translate3d(0px, ${carouselWidth / 2 + params.shadowOffset}px, ${
            -carouselWidth / 2
          }px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`
        );
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier =
          1.5 -
          (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 +
            Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        $cubeShadowEl.transform(
          `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${carouselHeight / 2 + offset}px, ${
            -carouselHeight / 2 / scale2
          }px) rotateX(-90deg)`
        );
      }
    }
    const zFactor = browser.isSafari || browser.isWebView ? -carouselSize / 2 : 0;
    $wrapperEl.transform(
      `translate3d(0px,0,${zFactor}px) rotateX(${
        carousel.isHorizontal() ? 0 : wrapperRotate
      }deg) rotateY(${carousel.isHorizontal() ? -wrapperRotate : 0}deg)`
    );
    $wrapperEl[0].style.setProperty('--carousel-cube-translate-z', `${zFactor}px`);
  };
  const setTransition = duration => {
    const { $el, slides } = carousel;
    slides
      .transition(duration)
      .find(
        '.vts-carousel-slide-shadow-top, .carousel-slide-shadow-right, .carousel-slide-shadow-bottom, .carousel-slide-shadow-left'
      )
      .transition(duration);
    if (carousel.params.cubeEffect.shadow && !carousel.isHorizontal()) {
      $el.find('.vts-carousel-cube-shadow').transition(duration);
    }
  };

  effectInit({
    effect: 'cube',
    carousel,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => carousel.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}
