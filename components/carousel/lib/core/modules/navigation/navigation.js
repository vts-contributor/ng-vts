import createElementIfNotDefined from '../../../shared/create-element-if-not-defined.js';
import $ from '../../../shared/dom.js';

export default function Navigation({ Carousel, extendParams, on, emit }) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'Carousel-button-disabled',
      hiddenClass: 'Carousel-button-hidden',
      lockClass: 'Carousel-button-lock',
      navigationDisabledClass: 'Carousel-navigation-disabled',
    },
  });

  Carousel.navigation = {
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
        Carousel.params.uniqueNavElements &&
        typeof el === 'string' &&
        $el.length > 1 &&
        Carousel.$el.find(el).length === 1
      ) {
        $el = Carousel.$el.find(el);
      }
    }
    return $el;
  }

  function toggleEl($el, disabled) {
    const params = Carousel.params.navigation;
    if ($el && $el.length > 0) {
      $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
      if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;
      if (Carousel.params.watchOverflow && Carousel.enabled) {
        $el[Carousel.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    }
  }
  function update() {
    // Update Navigation Buttons
    if (Carousel.params.loop) return;
    const { $nextEl, $prevEl } = Carousel.navigation;

    toggleEl($prevEl, Carousel.isBeginning && !Carousel.params.rewind);
    toggleEl($nextEl, Carousel.isEnd && !Carousel.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (Carousel.isBeginning && !Carousel.params.loop && !Carousel.params.rewind) return;
    Carousel.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (Carousel.isEnd && !Carousel.params.loop && !Carousel.params.rewind) return;
    Carousel.slideNext();
    emit('navigationNext');
  }
  function init() {
    const params = Carousel.params.navigation;

    Carousel.params.navigation = createElementIfNotDefined(
      Carousel,
      Carousel.originalParams.navigation,
      Carousel.params.navigation,
      {
        nextEl: 'Carousel-button-next',
        prevEl: 'Carousel-button-prev',
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

    Object.assign(Carousel.navigation, {
      $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl,
      prevEl: $prevEl && $prevEl[0],
    });

    if (!Carousel.enabled) {
      if ($nextEl) $nextEl.addClass(params.lockClass);
      if ($prevEl) $prevEl.addClass(params.lockClass);
    }
  }
  function destroy() {
    const { $nextEl, $prevEl } = Carousel.navigation;
    if ($nextEl && $nextEl.length) {
      $nextEl.off('click', onNextClick);
      $nextEl.removeClass(Carousel.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off('click', onPrevClick);
      $prevEl.removeClass(Carousel.params.navigation.disabledClass);
    }
  }

  on('init', () => {
    if (Carousel.params.navigation.enabled === false) {
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
    const { $nextEl, $prevEl } = Carousel.navigation;
    if ($nextEl) {
      $nextEl[Carousel.enabled ? 'removeClass' : 'addClass'](Carousel.params.navigation.lockClass);
    }
    if ($prevEl) {
      $prevEl[Carousel.enabled ? 'removeClass' : 'addClass'](Carousel.params.navigation.lockClass);
    }
  });
  on('click', (_s, e) => {
    const { $nextEl, $prevEl } = Carousel.navigation;
    const targetEl = e.target;
    if (
      Carousel.params.navigation.hideOnClick &&
      !$(targetEl).is($prevEl) &&
      !$(targetEl).is($nextEl)
    ) {
      if (
        Carousel.pagination &&
        Carousel.params.pagination &&
        Carousel.params.pagination.clickable &&
        (Carousel.pagination.el === targetEl || Carousel.pagination.el.contains(targetEl))
      )
        return;
      let isHidden;
      if ($nextEl) {
        isHidden = $nextEl.hasClass(Carousel.params.navigation.hiddenClass);
      } else if ($prevEl) {
        isHidden = $prevEl.hasClass(Carousel.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      if ($nextEl) {
        $nextEl.toggleClass(Carousel.params.navigation.hiddenClass);
      }
      if ($prevEl) {
        $prevEl.toggleClass(Carousel.params.navigation.hiddenClass);
      }
    }
  });

  const enable = () => {
    Carousel.$el.removeClass(Carousel.params.navigation.navigationDisabledClass);
    init();
    update();
  };

  const disable = () => {
    Carousel.$el.addClass(Carousel.params.navigation.navigationDisabledClass);
    destroy();
  };

  Object.assign(Carousel.navigation, {
    enable,
    disable,
    update,
    init,
    destroy,
  });
}
