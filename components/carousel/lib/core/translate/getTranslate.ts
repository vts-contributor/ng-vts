//@ts-nocheck
import { getTranslate } from '../../shared/utils';

export default function getcarouselTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
  const carousel = this;

  const { params, rtlTranslate: rtl, translate, $wrapperEl } = carousel;

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
