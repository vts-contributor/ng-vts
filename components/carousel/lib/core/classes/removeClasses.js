export default function removeClasses() {
  const Carousel = this;
  const { $el, classNames } = Carousel;

  $el.removeClass(classNames.join(' '));
  Carousel.emitContainerClasses();
}
