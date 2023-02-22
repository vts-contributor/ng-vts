export default function updateSize() {
  const Carousel = this;
  let width;
  let height;
  const $el = Carousel.$el;
  if (typeof Carousel.params.width !== 'undefined' && Carousel.params.width !== null) {
    width = Carousel.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof Carousel.params.height !== 'undefined' && Carousel.params.height !== null) {
    height = Carousel.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && Carousel.isHorizontal()) || (height === 0 && Carousel.isVertical())) {
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

  Object.assign(Carousel, {
    width,
    height,
    size: Carousel.isHorizontal() ? width : height,
  });
}
