import classesToSelector from '../../shared/classes-to-selector.js';
import $ from '../../shared/dom.js';

export default function A11y({ Carousel, extendParams, on }) {
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'Carousel-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
    },
  });

  Carousel.a11y = {
    clicked: false,
  };

  let liveRegion = null;

  function notify(message) {
    const notification = liveRegion;
    if (notification.length === 0) return;
    notification.html('');
    notification.html(message);
  }

  function getRandomNumber(size = 16) {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable($el) {
    $el.attr('tabIndex', '0');
  }
  function makeElNotFocusable($el) {
    $el.attr('tabIndex', '-1');
  }
  function addElRole($el, role) {
    $el.attr('role', role);
  }
  function addElRoleDescription($el, description) {
    $el.attr('aria-roledescription', description);
  }
  function addElControls($el, controls) {
    $el.attr('aria-controls', controls);
  }
  function addElLabel($el, label) {
    $el.attr('aria-label', label);
  }
  function addElId($el, id) {
    $el.attr('id', id);
  }
  function addElLive($el, live) {
    $el.attr('aria-live', live);
  }
  function disableEl($el) {
    $el.attr('aria-disabled', true);
  }
  function enableEl($el) {
    $el.attr('aria-disabled', false);
  }

  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = Carousel.params.a11y;
    const $targetEl = $(e.target);
    if (Carousel.navigation && Carousel.navigation.$nextEl && $targetEl.is(Carousel.navigation.$nextEl)) {
      if (!(Carousel.isEnd && !Carousel.params.loop)) {
        Carousel.slideNext();
      }
      if (Carousel.isEnd) {
        notify(params.lastSlideMessage);
      } else {
        notify(params.nextSlideMessage);
      }
    }
    if (Carousel.navigation && Carousel.navigation.$prevEl && $targetEl.is(Carousel.navigation.$prevEl)) {
      if (!(Carousel.isBeginning && !Carousel.params.loop)) {
        Carousel.slidePrev();
      }
      if (Carousel.isBeginning) {
        notify(params.firstSlideMessage);
      } else {
        notify(params.prevSlideMessage);
      }
    }

    if (
      Carousel.pagination &&
      $targetEl.is(classesToSelector(Carousel.params.pagination.bulletClass))
    ) {
      $targetEl[0].click();
    }
  }

  function updateNavigation() {
    if (Carousel.params.loop || Carousel.params.rewind || !Carousel.navigation) return;
    const { $nextEl, $prevEl } = Carousel.navigation;

    if ($prevEl && $prevEl.length > 0) {
      if (Carousel.isBeginning) {
        disableEl($prevEl);
        makeElNotFocusable($prevEl);
      } else {
        enableEl($prevEl);
        makeElFocusable($prevEl);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (Carousel.isEnd) {
        disableEl($nextEl);
        makeElNotFocusable($nextEl);
      } else {
        enableEl($nextEl);
        makeElFocusable($nextEl);
      }
    }
  }

  function hasPagination() {
    return Carousel.pagination && Carousel.pagination.bullets && Carousel.pagination.bullets.length;
  }

  function hasClickablePagination() {
    return hasPagination() && Carousel.params.pagination.clickable;
  }

  function updatePagination() {
    const params = Carousel.params.a11y;
    if (!hasPagination()) return;
    Carousel.pagination.bullets.each((bulletEl) => {
      const $bulletEl = $(bulletEl);
      if (Carousel.params.pagination.clickable) {
        makeElFocusable($bulletEl);
        if (!Carousel.params.pagination.renderBullet) {
          addElRole($bulletEl, 'button');
          addElLabel(
            $bulletEl,
            params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1),
          );
        }
      }
      if ($bulletEl.is(`.${Carousel.params.pagination.bulletActiveClass}`)) {
        $bulletEl.attr('aria-current', 'true');
      } else {
        $bulletEl.removeAttr('aria-current');
      }
    });
  }

  const initNavEl = ($el, wrapperId, message) => {
    makeElFocusable($el);
    if ($el[0].tagName !== 'BUTTON') {
      addElRole($el, 'button');
      $el.on('keydown', onEnterOrSpaceKey);
    }
    addElLabel($el, message);
    addElControls($el, wrapperId);
  };
  const handlePointerDown = () => {
    Carousel.a11y.clicked = true;
  };
  const handlePointerUp = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!Carousel.destroyed) {
          Carousel.a11y.clicked = false;
        }
      });
    });
  };

  const handleFocus = (e) => {
    if (Carousel.a11y.clicked) return;
    const slideEl = e.target.closest(`.${Carousel.params.slideClass}`);
    if (!slideEl || !Carousel.slides.includes(slideEl)) return;
    const isActive = Carousel.slides.indexOf(slideEl) === Carousel.activeIndex;
    const isVisible =
      Carousel.params.watchSlidesProgress &&
      Carousel.visibleSlides &&
      Carousel.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (Carousel.isHorizontal()) {
      Carousel.el.scrollLeft = 0;
    } else {
      Carousel.el.scrollTop = 0;
    }
    Carousel.slideTo(Carousel.slides.indexOf(slideEl), 0);
  };

  const initSlides = () => {
    const params = Carousel.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription($(Carousel.slides), params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole($(Carousel.slides), params.slideRole);
    }

    const slidesLength = Carousel.params.loop
      ? Carousel.slides.filter((el) => !el.classList.contains(Carousel.params.slideDuplicateClass))
          .length
      : Carousel.slides.length;
    if (params.slideLabelMessage) {
      Carousel.slides.each((slideEl, index) => {
        const $slideEl = $(slideEl);
        const slideIndex = Carousel.params.loop
          ? parseInt($slideEl.attr('data-Carousel-slide-index'), 10)
          : index;
        const ariaLabelMessage = params.slideLabelMessage
          .replace(/\{\{index\}\}/, slideIndex + 1)
          .replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel($slideEl, ariaLabelMessage);
      });
    }
  };

  const init = () => {
    const params = Carousel.params.a11y;

    Carousel.$el.append(liveRegion);

    // Container
    const $containerEl = Carousel.$el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel($containerEl, params.containerMessage);
    }

    // Wrapper
    const $wrapperEl = Carousel.$wrapperEl;
    const wrapperId = params.id || $wrapperEl.attr('id') || `Carousel-wrapper-${getRandomNumber(16)}`;
    const live = Carousel.params.autoplay && Carousel.params.autoplay.enabled ? 'off' : 'polite';
    addElId($wrapperEl, wrapperId);
    addElLive($wrapperEl, live);

    // Slide
    initSlides();

    // Navigation
    let $nextEl;
    let $prevEl;
    if (Carousel.navigation && Carousel.navigation.$nextEl) {
      $nextEl = Carousel.navigation.$nextEl;
    }
    if (Carousel.navigation && Carousel.navigation.$prevEl) {
      $prevEl = Carousel.navigation.$prevEl;
    }

    if ($nextEl && $nextEl.length) {
      initNavEl($nextEl, wrapperId, params.nextSlideMessage);
    }
    if ($prevEl && $prevEl.length) {
      initNavEl($prevEl, wrapperId, params.prevSlideMessage);
    }

    // Pagination
    if (hasClickablePagination()) {
      Carousel.pagination.$el.on(
        'keydown',
        classesToSelector(Carousel.params.pagination.bulletClass),
        onEnterOrSpaceKey,
      );
    }

    // Tab focus
    Carousel.$el.on('focus', handleFocus, true);
    Carousel.$el.on('pointerdown', handlePointerDown, true);
    Carousel.$el.on('pointerup', handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion && liveRegion.length > 0) liveRegion.remove();

    let $nextEl;
    let $prevEl;
    if (Carousel.navigation && Carousel.navigation.$nextEl) {
      $nextEl = Carousel.navigation.$nextEl;
    }
    if (Carousel.navigation && Carousel.navigation.$prevEl) {
      $prevEl = Carousel.navigation.$prevEl;
    }
    if ($nextEl) {
      $nextEl.off('keydown', onEnterOrSpaceKey);
    }
    if ($prevEl) {
      $prevEl.off('keydown', onEnterOrSpaceKey);
    }

    // Pagination
    if (hasClickablePagination()) {
      Carousel.pagination.$el.off(
        'keydown',
        classesToSelector(Carousel.params.pagination.bulletClass),
        onEnterOrSpaceKey,
      );
    }

    // Tab focus
    Carousel.$el.off('focus', handleFocus, true);
    Carousel.$el.off('pointerdown', handlePointerDown, true);
    Carousel.$el.off('pointerup', handlePointerUp, true);
  }

  on('beforeInit', () => {
    liveRegion = $(
      `<span class="${Carousel.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`,
    );
  });

  on('afterInit', () => {
    if (!Carousel.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!Carousel.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!Carousel.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!Carousel.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!Carousel.params.a11y.enabled) return;
    destroy();
  });
}
