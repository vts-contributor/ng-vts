//@ts-nocheck
import { getWindow } from 'ssr-window';

export default function Resize({ carousel, on, emit }) {
  const window = getWindow();
  let observer = null;
  let animationFrame = null;

  const resizeHandler = () => {
    if (!carousel || carousel.destroyed || !carousel.initialized) return;
    emit('beforeResize');
    emit('resize');
  };

  const createObserver = () => {
    if (!carousel || carousel.destroyed || !carousel.initialized) return;
    observer = new ResizeObserver(entries => {
      animationFrame = window.requestAnimationFrame(() => {
        const { width, height } = carousel;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({ contentBoxSize, contentRect, target }) => {
          if (target && target !== carousel.el) return;
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
    observer.observe(carousel.el);
  };

  const removeObserver = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && carousel.el) {
      observer.unobserve(carousel.el);
      observer = null;
    }
  };

  const orientationChangeHandler = () => {
    if (!carousel || carousel.destroyed || !carousel.initialized) return;
    emit('orientationchange');
  };

  on('init', () => {
    if (carousel.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
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
