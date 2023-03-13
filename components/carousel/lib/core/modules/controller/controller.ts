//@ts-nocheck
/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
import { nextTick } from '../../../shared/utils';

export default function Controller({ carousel, extendParams, on }) {
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'
    }
  });

  carousel.controller = {
    control: undefined
  };

  function LinearSpline(x, y) {
    const binarySearch = (function search() {
      let maxIndex;
      let minIndex;
      let guess;
      return (array, val) => {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = (maxIndex + minIndex) >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    })();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    let i1;
    let i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (
        ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1]
      );
    };
    return this;
  }
  // xxx: for now i will just save one spline function to to
  function getInterpolateFunction(c) {
    if (!carousel.controller.spline) {
      carousel.controller.spline = carousel.params.loop
        ? new LinearSpline(carousel.slidesGrid, c.slidesGrid)
        : new LinearSpline(carousel.snapGrid, c.snapGrid);
    }
  }
  function setTranslate(_t, byController) {
    const controlled = carousel.controller.control;
    let multiplier;
    let controlledTranslate;
    const carousel = carousel.constructor;
    function setControlledTranslate(c) {
      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      const translate = carousel.rtlTranslate ? -carousel.translate : carousel.translate;
      if (carousel.params.controller.by === 'slide') {
        getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -carousel.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || carousel.params.controller.by === 'container') {
        multiplier =
          (c.maxTranslate() - c.minTranslate()) /
          (carousel.maxTranslate() - carousel.minTranslate());
        controlledTranslate = (translate - carousel.minTranslate()) * multiplier + c.minTranslate();
      }

      if (carousel.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, carousel);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof carousel) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof carousel && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration, byController) {
    const carousel = carousel.constructor;
    const controlled = carousel.controller.control;
    let i;
    function setControlledTransition(c) {
      c.setTransition(duration, carousel);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          nextTick(() => {
            c.updateAutoHeight();
          });
        }
        c.$wrapperEl.transitionEnd(() => {
          if (!controlled) return;
          if (c.params.loop && carousel.params.controller.by === 'slide') {
            c.loopFix();
          }
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof carousel) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof carousel && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }

  function removeSpline() {
    if (!carousel.controller.control) return;
    if (carousel.controller.spline) {
      carousel.controller.spline = undefined;
      delete carousel.controller.spline;
    }
  }
  on('beforeInit', () => {
    carousel.controller.control = carousel.params.controller.control;
  });
  on('update', () => {
    removeSpline();
  });
  on('resize', () => {
    removeSpline();
  });
  on('observerUpdate', () => {
    removeSpline();
  });
  on('setTranslate', (_s, translate, byController) => {
    if (!carousel.controller.control) return;
    carousel.controller.setTranslate(translate, byController);
  });
  on('setTransition', (_s, duration, byController) => {
    if (!carousel.controller.control) return;
    carousel.controller.setTransition(duration, byController);
  });

  Object.assign(carousel.controller, {
    setTranslate,
    setTransition
  });
}
