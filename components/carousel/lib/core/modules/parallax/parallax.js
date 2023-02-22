import $ from '../../shared/dom.js';

export default function Parallax({ Carousel, extendParams, on }) {
  extendParams({
    parallax: {
      enabled: false,
    },
  });

  const setTransform = (el, progress) => {
    const { rtl } = Carousel;

    const $el = $(el);
    const rtlFactor = rtl ? -1 : 1;

    const p = $el.attr('data-Carousel-parallax') || '0';
    let x = $el.attr('data-Carousel-parallax-x');
    let y = $el.attr('data-Carousel-parallax-y');
    const scale = $el.attr('data-Carousel-parallax-scale');
    const opacity = $el.attr('data-Carousel-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (Carousel.isHorizontal()) {
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
    const { $el, slides, progress, snapGrid } = Carousel;
    $el
      .children(
        '[data-Carousel-parallax], [data-Carousel-parallax-x], [data-Carousel-parallax-y], [data-Carousel-parallax-opacity], [data-Carousel-parallax-scale]',
      )
      .each((el) => {
        setTransform(el, progress);
      });
    slides.each((slideEl, slideIndex) => {
      let slideProgress = slideEl.progress;
      if (Carousel.params.slidesPerGroup > 1 && Carousel.params.vtsSlidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      $(slideEl)
        .find(
          '[data-Carousel-parallax], [data-Carousel-parallax-x], [data-Carousel-parallax-y], [data-Carousel-parallax-opacity], [data-Carousel-parallax-scale]',
        )
        .each((el) => {
          setTransform(el, slideProgress);
        });
    });
  };

  const setTransition = (duration = Carousel.params.speed) => {
    const { $el } = Carousel;
    $el
      .find(
        '[data-Carousel-parallax], [data-Carousel-parallax-x], [data-Carousel-parallax-y], [data-Carousel-parallax-opacity], [data-Carousel-parallax-scale]',
      )
      .each((parallaxEl) => {
        const $parallaxEl = $(parallaxEl);
        let parallaxDuration =
          parseInt($parallaxEl.attr('data-Carousel-parallax-duration'), 10) || duration;
        if (duration === 0) parallaxDuration = 0;
        $parallaxEl.transition(parallaxDuration);
      });
  };

  on('beforeInit', () => {
    if (!Carousel.params.parallax.enabled) return;
    Carousel.params.watchSlidesProgress = true;
    Carousel.originalParams.watchSlidesProgress = true;
  });
  on('init', () => {
    if (!Carousel.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', () => {
    if (!Carousel.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', (_Carousel, duration) => {
    if (!Carousel.params.parallax.enabled) return;
    setTransition(duration);
  });
}
