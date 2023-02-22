import { getTranslate } from '../../shared/utils.js';

export default function getCarouselTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
  const Carousel = this;

  const { params, rtlTranslate: rtl, translate, $wrapperEl } = Carousel;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }

  let currentTranslate = getTranslate($wrapperEl[0], axis);
  if (rtl) currentTranslate = -currentTranslate;

  return currentTranslate || 0;
}
