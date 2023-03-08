//@ts-nocheck
export default function updateSize() {
  const carousel = this;
  let width;
  let height;
  const $el = carousel.$el;
  if (typeof carousel.params.width !== 'undefined' && carousel.params.width !== null) {
    width = carousel.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof carousel.params.height !== 'undefined' && carousel.params.height !== null) {
    height = carousel.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && carousel.isHorizontal()) || (height === 0 && carousel.isVertical())) {
    return;
  }

  // Subtract paddings
  width =
    width -
    parseInt($el.css('padding-left') || 0, 10) -
    parseInt($el.css('padding-right') || 0, 10);
  height =
    height -
    parseInt($el.css('padding-top') || 0, 10) -
    parseInt($el.css('padding-bottom') || 0, 10);

  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;

  Object.assign(carousel, {
    width,
    height,
    size: carousel.isHorizontal() ? width : height
  });
}
