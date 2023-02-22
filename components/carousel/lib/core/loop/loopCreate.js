import { getDocument } from 'ssr-window';
import $ from '../../shared/dom.js';

export default function loopCreate() {
  const Carousel = this;
  const document = getDocument();
  const { params, $wrapperEl } = Carousel;
  // Remove duplicated slides
  const $selector =
    $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
  $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();

  let slides = $selector.children(`.${params.slideClass}`);

  if (params.loopFillGroupWithBlank) {
    const blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (let i = 0; i < blankSlidesNum; i += 1) {
        const blankNode = $(document.createElement('div')).addClass(
          `${params.slideClass} ${params.slideBlankClass}`,
        );
        $selector.append(blankNode);
      }
      slides = $selector.children(`.${params.slideClass}`);
    }
  }

  if (params.vtsSlidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;

  Carousel.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.vtsSlidesPerView, 10));
  Carousel.loopedSlides += params.loopAdditionalSlides;
  if (Carousel.loopedSlides > slides.length && Carousel.params.loopedSlidesLimit) {
    Carousel.loopedSlides = slides.length;
  }

  const prependSlides = [];
  const appendSlides = [];

  slides.each((el, index) => {
    const slide = $(el);
    slide.attr('data-Carousel-slide-index', index);
  });

  for (let i = 0; i < Carousel.loopedSlides; i += 1) {
    const index = i - Math.floor(i / slides.length) * slides.length;
    appendSlides.push(slides.eq(index)[0]);
    prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
  }

  for (let i = 0; i < appendSlides.length; i += 1) {
    $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
    $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
}
