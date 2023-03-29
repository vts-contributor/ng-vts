//@ts-nocheck
import createElementIfNotDefined from '../../../shared/create-element-if-not-defined';
import $ from '../../../shared/dom';

export default function Navigation({ carousel, extendParams, on, emit }) {
  const pfx = 'vts-carousel-navigation';
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'vts-carousel-button-disabled',
      hiddenClass: 'vts-carousel-button-hidden',
      lockClass: 'vts-carousel-button-lock',
      navigationDisabledClass: `${pfx}-disabled`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      position: `inner`
    }
  });

  carousel.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
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
    const { $nextEl, $prevEl } = carousel.navigation;

    // Direction
    const params = carousel.params.navigation;
    const removeCls = [
      ...['-inner', '-edge'].map(suffix => `${pfx}${suffix}`),
      params.horizontalClass,
      params.verticalClass
    ].join(' ');
    if ($nextEl) {
      $nextEl.removeClass(removeCls);
      $nextEl.addClass(carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);
      $nextEl.addClass(`${pfx}-${params.position}`);
    }
    if ($prevEl) {
      $prevEl.removeClass(removeCls);
      $prevEl.addClass(carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);
      $prevEl.addClass(`${pfx}-${params.position}`);
    }

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

    if (!params.nextEl) params.nextEl = 'vts-carousel-button-next';

    if (!params.nextEl) params.prevEl = 'vts-carousel-button-prev';

    carousel.params.navigation = createElementIfNotDefined(
      carousel,
      carousel.originalParams.navigation,
      carousel.params.navigation,
      {
        nextEl: 'vts-carousel-button-next',
        prevEl: 'vts-carousel-button-prev'
      }
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
      prevEl: $prevEl && $prevEl[0]
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
      carousel.navigation.enabled = true;
    }
  });
  on('update', () => {
    const { enabled } = carousel.params.navigation;
    if (!enabled && !!carousel.navigation.enabled) disable();
    if (enabled && !carousel.navigation.enabled) enable();
    update();
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
    carousel.navigation.enabled = true;
  };

  const disable = () => {
    carousel.$el.addClass(carousel.params.navigation.navigationDisabledClass);
    destroy();
    carousel.navigation.enabled = false;
  };

  Object.assign(carousel.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}
