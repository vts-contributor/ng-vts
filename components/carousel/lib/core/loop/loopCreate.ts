//@ts-nocheck
import { getDocument } from 'ssr-window';
import $ from '../../shared/dom';

export default function loopCreate() {
  const carousel = this;
  const document = getDocument();
  const { params, $wrapperEl } = carousel;
  // Remove duplicated slides
  const $selector =
    $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
  $selector.children(`.${params.vtsSlideClass}.${params.vtsSlideDuplicateClass}`).remove();

  let slides = $selector.children(`.${params.vtsSlideClass}`);

  if (params.loopFillGroupWithBlank) {
    const blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (let i = 0; i < blankSlidesNum; i += 1) {
        const blankNode = $(document.createElement('div')).addClass(
          `${params.vtsSlideClass} ${params.slideBlankClass}`
        );
        $selector.append(blankNode);
      }
      slides = $selector.children(`.${params.vtsSlideClass}`);
    }
  }

  if (params.vtsSlidesPerView === 'auto' && !params.vtsLoopedSlides)
    params.vtsLoopedSlides = slides.length;

  carousel.vtsLoopedSlides = Math.ceil(
    parseFloat(params.vtsLoopedSlides || params.vtsSlidesPerView, 10)
  );
  carousel.vtsLoopedSlides += params.vtsLoopAdditionalSlides;
  if (carousel.vtsLoopedSlides > slides.length && carousel.params.loopedSlidesLimit) {
    carousel.vtsLoopedSlides = slides.length;
  }

  const prependSlides = [];
  const appendSlides = [];

  slides.each((el, index) => {
    const slide = $(el);
    slide.attr('data-carousel-slide-index', index);
  });

  for (let i = 0; i < carousel.vtsLoopedSlides; i += 1) {
    const index = i - Math.floor(i / slides.length) * slides.length;
    appendSlides.push(slides.eq(index)[0]);
    prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
  }

  for (let i = 0; i < appendSlides.length; i += 1) {
    $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.vtsSlideDuplicateClass));
  }
  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
    $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.vtsSlideDuplicateClass));
  }
}
