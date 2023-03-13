//@ts-nocheck
import $ from '../../../shared/dom';

export default function Parallax({ carousel, extendParams, on }) {
  extendParams({
    parallax: {
      enabled: false
    }
  });

  const setTransform = (el, progress) => {
    const { rtl } = carousel;

    const $el = $(el);
    const rtlFactor = rtl ? -1 : 1;

    const p = $el.attr('data-carousel-parallax') || '0';
    let x = $el.attr('data-carousel-parallax-x');
    let y = $el.attr('data-carousel-parallax-y');
    const scale = $el.attr('data-carousel-parallax-scale');
    const opacity = $el.attr('data-carousel-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (carousel.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if (x.indexOf('%') >= 0) {
      x = `${parseInt(x, 10) * progress * rtlFactor}%`;
    } else {
      x = `${x * progress * rtlFactor}px`;
    }
    if (y.indexOf('%') >= 0) {
      y = `${parseInt(y, 10) * progress}%`;
    } else {
      y = `${y * progress}px`;
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      $el[0].style.opacity = currentOpacity;
    }
    if (typeof scale === 'undefined' || scale === null) {
      $el.transform(`translate3d(${x}, ${y}, 0px)`);
    } else {
      const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
    }
  };

  const setTranslate = () => {
    const { $el, slides, progress, snapGrid } = carousel;
    $el
      .children(
        '[data-carousel-parallax], [data-carousel-parallax-x], [data-carousel-parallax-y], [data-carousel-parallax-opacity], [data-carousel-parallax-scale]'
      )
      .each(el => {
        setTransform(el, progress);
      });
    slides.each((slideEl, slideIndex) => {
      let slideProgress = slideEl.progress;
      if (carousel.params.slidesPerGroup > 1 && carousel.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      $(slideEl)
        .find(
          '[data-carousel-parallax], [data-carousel-parallax-x], [data-carousel-parallax-y], [data-carousel-parallax-opacity], [data-carousel-parallax-scale]'
        )
        .each(el => {
          setTransform(el, slideProgress);
        });
    });
  };

  const setTransition = (duration = carousel.params.speed) => {
    const { $el } = carousel;
    $el
      .find(
        '[data-carousel-parallax], [data-carousel-parallax-x], [data-carousel-parallax-y], [data-carousel-parallax-opacity], [data-carousel-parallax-scale]'
      )
      .each(parallaxEl => {
        const $parallaxEl = $(parallaxEl);
        let parallaxDuration =
          parseInt($parallaxEl.attr('data-carousel-parallax-duration'), 10) || duration;
        if (duration === 0) parallaxDuration = 0;
        $parallaxEl.transition(parallaxDuration);
      });
  };

  on('beforeInit', () => {
    if (!carousel.params.parallax.enabled) return;
    carousel.params.watchSlidesProgress = true;
    carousel.originalParams.watchSlidesProgress = true;
  });
  on('init', () => {
    if (!carousel.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', () => {
    if (!carousel.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', (_carousel, duration) => {
    if (!carousel.params.parallax.enabled) return;
    setTransition(duration);
  });
}
