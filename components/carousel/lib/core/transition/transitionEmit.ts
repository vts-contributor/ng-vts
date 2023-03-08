//@ts-nocheck
export default function transitionEmit({ carousel, runCallbacks, direction, step }) {
  const { activeIndex, previousIndex } = carousel;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';
    else if (activeIndex < previousIndex) dir = 'prev';
    else dir = 'reset';
  }

  carousel.emit(`transition${step}`);

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      carousel.emit(`slideResetTransition${step}`);
      return;
    }
    carousel.emit(`slideChangeTransition${step}`);
    if (dir === 'next') {
      carousel.emit(`slideNextTransition${step}`);
    } else {
      carousel.emit(`slidePrevTransition${step}`);
    }
  }
}
