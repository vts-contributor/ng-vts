import createElementIfNotDefined from '../../../shared/create-element-if-not-defined.js';
import $ from '../../../shared/dom.js';

export default function Navigation({ carousel, extendParams, on, emit }) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'carousel-button-disabled',
      hiddenClass: 'carousel-button-hidden',
      lockClass: 'carousel-button-lock',
      navigationDisabledClass: 'carousel-navigation-disabled',
    },
  });

  carousel.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null,
  };

  function getEl(el) {
    let $el;
    if (el) {
      $el = $(el);
      if (
        carousel.params.uniqueNavElements &&
        typeof el === 'string' &&
        $el.length > 1 &&
        carousel.$el.find(el).length === 1
      ) {
        $el = carousel.$el.find(el);
      }
    }
    return $el;
  }

  function toggleEl($el, disabled) {
    const params = carousel.params.navigation;
    if ($el && $el.length > 0) {
      $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
      if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;
      if (carousel.params.watchOverflow && carousel.enabled) {
        $el[carousel.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    }
  }
  function update() {
    // Update Navigation Buttons
    if (carousel.params.loop) return;
    const { $nextEl, $prevEl } = carousel.navigation;

    toggleEl($prevEl, carousel.isBeginning && !carousel.params.rewind);
    toggleEl($nextEl, carousel.isEnd && !carousel.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (carousel.isBeginning && !carousel.params.loop && !carousel.params.rewind) return;
    carousel.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (carousel.isEnd && !carousel.params.loop && !carousel.params.rewind) return;
    carousel.slideNext();
    emit('navigationNext');
  }
  function init() {
    const params = carousel.params.navigation;

    carousel.params.navigation = createElementIfNotDefined(
      carousel,
      carousel.originalParams.navigation,
      carousel.params.navigation,
      {
        nextEl: 'carousel-button-next',
        prevEl: 'carousel-button-prev',
      },
    );
    if (!(params.nextEl || params.prevEl)) return;

    const $nextEl = getEl(params.nextEl);
    const $prevEl = getEl(params.prevEl);

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', onNextClick);
    }
    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', onPrevClick);
    }

    Object.assign(carousel.navigation, {
      $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl,
      prevEl: $prevEl && $prevEl[0],
    });

    if (!carousel.enabled) {
      if ($nextEl) $nextEl.addClass(params.lockClass);
      if ($prevEl) $prevEl.addClass(params.lockClass);
    }
  }
  function destroy() {
    const { $nextEl, $prevEl } = carousel.navigation;
    if ($nextEl && $nextEl.length) {
      $nextEl.off('click', onNextClick);
      $nextEl.removeClass(carousel.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off('click', onPrevClick);
      $prevEl.removeClass(carousel.params.navigation.disabledClass);
    }
  }

  on('init', () => {
    if (carousel.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const { $nextEl, $prevEl } = carousel.navigation;
    if ($nextEl) {
      $nextEl[carousel.enabled ? 'removeClass' : 'addClass'](carousel.params.navigation.lockClass);
    }
    if ($prevEl) {
      $prevEl[carousel.enabled ? 'removeClass' : 'addClass'](carousel.params.navigation.lockClass);
    }
  });
  on('click', (_s, e) => {
    const { $nextEl, $prevEl } = carousel.navigation;
    const targetEl = e.target;
    if (
      carousel.params.navigation.hideOnClick &&
      !$(targetEl).is($prevEl) &&
      !$(targetEl).is($nextEl)
    ) {
      if (
        carousel.pagination &&
        carousel.params.pagination &&
        carousel.params.pagination.clickable &&
        (carousel.pagination.el === targetEl || carousel.pagination.el.contains(targetEl))
      )
        return;
      let isHidden;
      if ($nextEl) {
        isHidden = $nextEl.hasClass(carousel.params.navigation.hiddenClass);
      } else if ($prevEl) {
        isHidden = $prevEl.hasClass(carousel.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      if ($nextEl) {
        $nextEl.toggleClass(carousel.params.navigation.hiddenClass);
      }
      if ($prevEl) {
        $prevEl.toggleClass(carousel.params.navigation.hiddenClass);
      }
    }
  });

  const enable = () => {
    carousel.$el.removeClass(carousel.params.navigation.navigationDisabledClass);
    init();
    update();
  };

  const disable = () => {
    carousel.$el.addClass(carousel.params.navigation.navigationDisabledClass);
    destroy();
  };

  Object.assign(carousel.navigation, {
    enable,
    disable,
    update,
    init,
    destroy,
  });
}
