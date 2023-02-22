import { getWindow } from 'ssr-window';

export default function Resize({ Carousel, on, emit }) {
  const window = getWindow();
  let observer = null;
  let animationFrame = null;

  const resizeHandler = () => {
    if (!Carousel || Carousel.destroyed || !Carousel.initialized) return;
    emit('beforeResize');
    emit('resize');
  };

  const createObserver = () => {
    if (!Carousel || Carousel.destroyed || !Carousel.initialized) return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window.requestAnimationFrame(() => {
        const { width, height } = Carousel;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({ contentBoxSize, contentRect, target }) => {
          if (target && target !== Carousel.el) return;
          newWidth = contentRect
            ? contentRect.width
            : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect
            ? contentRect.height
            : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(Carousel.el);
  };

  const removeObserver = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && Carousel.el) {
      observer.unobserve(Carousel.el);
      observer = null;
    }
  };

  const orientationChangeHandler = () => {
    if (!Carousel || Carousel.destroyed || !Carousel.initialized) return;
    emit('orientationchange');
  };

  on('init', () => {
    if (Carousel.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });

  on('destroy', () => {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}
