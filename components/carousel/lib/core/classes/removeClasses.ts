//@ts-nocheck
export default function removeClasses() {
  const carousel = this;
  const { $el, classNames } = carousel;

  $el.removeClass(classNames.join(' '));
  carousel.emitContainerClasses();
}
