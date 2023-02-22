export default function transitionEmit({ Carousel, runCallbacks, direction, step }) {
  const { activeIndex, previousIndex } = Carousel;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';
    else if (activeIndex < previousIndex) dir = 'prev';
    else dir = 'reset';
  }

  Carousel.emit(`transition${step}`);

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      Carousel.emit(`slideResetTransition${step}`);
      return;
    }
    Carousel.emit(`slideChangeTransition${step}`);
    if (dir === 'next') {
      Carousel.emit(`slideNextTransition${step}`);
    } else {
      Carousel.emit(`slidePrevTransition${step}`);
    }
  }
}
