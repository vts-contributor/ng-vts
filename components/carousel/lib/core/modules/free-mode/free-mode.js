import { now } from '../../shared/utils.js';

export default function freeMode({ Carousel, extendParams, emit, once }) {
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02,
    },
  });

  function onTouchStart() {
    const translate = Carousel.getTranslate();
    Carousel.setTranslate(translate);
    Carousel.setTransition(0);
    Carousel.touchEventsData.velocities.length = 0;
    Carousel.freeMode.onTouchEnd({ currentPos: Carousel.rtl ? Carousel.translate : -Carousel.translate });
  }

  function onTouchMove() {
    const { touchEventsData: data, touches } = Carousel;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[Carousel.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime,
      });
    }
    data.velocities.push({
      position: touches[Carousel.isHorizontal() ? 'currentX' : 'currentY'],
      time: now(),
    });
  }

  function onTouchEnd({ currentPos }) {
    const { params, $wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data } = Carousel;
    // Time diff
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;

    if (currentPos < -Carousel.minTranslate()) {
      Carousel.slideTo(Carousel.activeIndex);
      return;
    }
    if (currentPos > -Carousel.maxTranslate()) {
      if (Carousel.slides.length < snapGrid.length) {
        Carousel.slideTo(snapGrid.length - 1);
      } else {
        Carousel.slideTo(Carousel.slides.length - 1);
      }
      return;
    }

    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop();
        const velocityEvent = data.velocities.pop();

        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        Carousel.velocity = distance / time;
        Carousel.velocity /= 2;
        if (Math.abs(Carousel.velocity) < params.freeMode.minimumVelocity) {
          Carousel.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || now() - lastMoveEvent.time > 300) {
          Carousel.velocity = 0;
        }
      } else {
        Carousel.velocity = 0;
      }
      Carousel.velocity *= params.freeMode.momentumVelocityRatio;

      data.velocities.length = 0;
      let momentumDuration = 1000 * params.freeMode.momentumRatio;
      const momentumDistance = Carousel.velocity * momentumDuration;

      let newPosition = Carousel.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;

      let doBounce = false;
      let afterBouncePosition;
      const bounceAmount = Math.abs(Carousel.velocity) * 20 * params.freeMode.momentumBounceRatio;
      let needsLoopFix;
      if (newPosition < Carousel.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + Carousel.maxTranslate() < -bounceAmount) {
            newPosition = Carousel.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = Carousel.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = Carousel.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > Carousel.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - Carousel.minTranslate() > bounceAmount) {
            newPosition = Carousel.minTranslate() + bounceAmount;
          }
          afterBouncePosition = Carousel.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = Carousel.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        let nextSlide;
        for (let j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }

        if (
          Math.abs(snapGrid[nextSlide] - newPosition) <
            Math.abs(snapGrid[nextSlide - 1] - newPosition) ||
          Carousel.swipeDirection === 'next'
        ) {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', () => {
          Carousel.loopFix();
        });
      }
      // Fix duration
      if (Carousel.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - Carousel.translate) / Carousel.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - Carousel.translate) / Carousel.velocity);
        }
        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - Carousel.translate);
          const currentSlideSize = Carousel.slidesSizesGrid[Carousel.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        Carousel.slideToClosest();
        return;
      }

      if (params.freeMode.momentumBounce && doBounce) {
        Carousel.updateProgress(afterBouncePosition);
        Carousel.setTransition(momentumDuration);
        Carousel.setTranslate(newPosition);
        Carousel.transitionStart(true, Carousel.swipeDirection);
        Carousel.animating = true;
        $wrapperEl.transitionEnd(() => {
          if (!Carousel || Carousel.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          Carousel.setTransition(params.speed);
          setTimeout(() => {
            Carousel.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(() => {
              if (!Carousel || Carousel.destroyed) return;
              Carousel.transitionEnd();
            });
          }, 0);
        });
      } else if (Carousel.velocity) {
        emit('_freeModeNoMomentumRelease');
        Carousel.updateProgress(newPosition);
        Carousel.setTransition(momentumDuration);
        Carousel.setTranslate(newPosition);
        Carousel.transitionStart(true, Carousel.swipeDirection);
        if (!Carousel.animating) {
          Carousel.animating = true;
          $wrapperEl.transitionEnd(() => {
            if (!Carousel || Carousel.destroyed) return;
            Carousel.transitionEnd();
          });
        }
      } else {
        Carousel.updateProgress(newPosition);
      }

      Carousel.updateActiveIndex();
      Carousel.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      Carousel.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }

    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      Carousel.updateProgress();
      Carousel.updateActiveIndex();
      Carousel.updateSlidesClasses();
    }
  }

  Object.assign(Carousel, {
    freeMode: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  });
}
