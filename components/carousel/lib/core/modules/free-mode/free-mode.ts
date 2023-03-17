//@ts-nocheck
import { now } from '../../../shared/utils';

export default function freeMode({ carousel, extendParams, emit, once }) {
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });

  function onTouchStart() {
    const translate = carousel.getTranslate();
    carousel.setTranslate(translate);
    carousel.setTransition(0);
    carousel.touchEventsData.velocities.length = 0;
    carousel.freeMode.onTouchEnd({
      currentPos: carousel.rtl ? carousel.translate : -carousel.translate
    });
  }

  function onTouchMove() {
    const { touchEventsData: data, touches } = carousel;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[carousel.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[carousel.isHorizontal() ? 'currentX' : 'currentY'],
      time: now()
    });
  }

  function onTouchEnd({ currentPos }) {
    const { params, $wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data } = carousel;
    // Time diff
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;

    if (currentPos < -carousel.minTranslate()) {
      carousel.slideTo(carousel.activeIndex);
      return;
    }
    if (currentPos > -carousel.maxTranslate()) {
      if (carousel.slides.length < snapGrid.length) {
        carousel.slideTo(snapGrid.length - 1);
      } else {
        carousel.slideTo(carousel.slides.length - 1);
      }
      return;
    }

    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop();
        const velocityEvent = data.velocities.pop();

        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        carousel.velocity = distance / time;
        carousel.velocity /= 2;
        if (Math.abs(carousel.velocity) < params.freeMode.minimumVelocity) {
          carousel.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || now() - lastMoveEvent.time > 300) {
          carousel.velocity = 0;
        }
      } else {
        carousel.velocity = 0;
      }
      carousel.velocity *= params.freeMode.momentumVelocityRatio;

      data.velocities.length = 0;
      let momentumDuration = 1000 * params.freeMode.momentumRatio;
      const momentumDistance = carousel.velocity * momentumDuration;

      let newPosition = carousel.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;

      let doBounce = false;
      let afterBouncePosition;
      const bounceAmount = Math.abs(carousel.velocity) * 20 * params.freeMode.momentumBounceRatio;
      let needsLoopFix;
      if (newPosition < carousel.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + carousel.maxTranslate() < -bounceAmount) {
            newPosition = carousel.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = carousel.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = carousel.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > carousel.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - carousel.minTranslate() > bounceAmount) {
            newPosition = carousel.minTranslate() + bounceAmount;
          }
          afterBouncePosition = carousel.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = carousel.minTranslate();
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
          carousel.swipeDirection === 'next'
        ) {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', () => {
          carousel.loopFix();
        });
      }
      // Fix duration
      if (carousel.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - carousel.translate) / carousel.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - carousel.translate) / carousel.velocity);
        }
        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - carousel.translate);
          const currentSlideSize = carousel.slidesSizesGrid[carousel.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        carousel.slideToClosest();
        return;
      }

      if (params.freeMode.momentumBounce && doBounce) {
        carousel.updateProgress(afterBouncePosition);
        carousel.setTransition(momentumDuration);
        carousel.setTranslate(newPosition);
        carousel.transitionStart(true, carousel.swipeDirection);
        carousel.animating = true;
        $wrapperEl.transitionEnd(() => {
          if (!carousel || carousel.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          carousel.setTransition(params.speed);
          setTimeout(() => {
            carousel.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(() => {
              if (!carousel || carousel.destroyed) return;
              carousel.transitionEnd();
            });
          }, 0);
        });
      } else if (carousel.velocity) {
        emit('_freeModeNoMomentumRelease');
        carousel.updateProgress(newPosition);
        carousel.setTransition(momentumDuration);
        carousel.setTranslate(newPosition);
        carousel.transitionStart(true, carousel.swipeDirection);
        if (!carousel.animating) {
          carousel.animating = true;
          $wrapperEl.transitionEnd(() => {
            if (!carousel || carousel.destroyed) return;
            carousel.transitionEnd();
          });
        }
      } else {
        carousel.updateProgress(newPosition);
      }

      carousel.updateActiveIndex();
      carousel.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      carousel.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }

    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      carousel.updateProgress();
      carousel.updateActiveIndex();
      carousel.updateSlidesClasses();
    }
  }

  Object.assign(carousel, {
    freeMode: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  });
}
