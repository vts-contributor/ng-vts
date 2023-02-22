import $ from '../../../shared/dom.js';
import classesToSelector from '../../../shared/classes-to-selector.js';
import createElementIfNotDefined from '../../../shared/create-element-if-not-defined.js';

export default function Pagination({ Carousel, extendParams, on, emit }) {
  const pfx = 'Carousel-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`,
    },
  });

  Carousel.pagination = {
    el: null,
    $el: null,
    bullets: [],
  };

  let bulletSize;
  let dynamicBulletIndex = 0;

  function isPaginationDisabled() {
    return (
      !Carousel.params.pagination.el ||
      !Carousel.pagination.el ||
      !Carousel.pagination.$el ||
      Carousel.pagination.$el.length === 0
    );
  }

  function setSideBullets($bulletEl, position) {
    const { bulletActiveClass } = Carousel.params.pagination;
    $bulletEl[position]()
      .addClass(`${bulletActiveClass}-${position}`)
      [position]()
      .addClass(`${bulletActiveClass}-${position}-${position}`);
  }

  function update() {
    // Render || Update Pagination bullets/items
    const rtl = Carousel.rtl;
    const params = Carousel.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength =
      Carousel.virtual && Carousel.params.virtual.enabled
        ? Carousel.virtual.slides.length
        : Carousel.slides.length;
    const $el = Carousel.pagination.$el;
    // Current/Total
    let current;
    const total = Carousel.params.loop
      ? Math.ceil((slidesLength - Carousel.loopedSlides * 2) / Carousel.params.slidesPerGroup)
      : Carousel.snapGrid.length;
    if (Carousel.params.loop) {
      current = Math.ceil(
        (Carousel.activeIndex - Carousel.loopedSlides) / Carousel.params.slidesPerGroup,
      );
      if (current > slidesLength - 1 - Carousel.loopedSlides * 2) {
        current -= slidesLength - Carousel.loopedSlides * 2;
      }
      if (current > total - 1) current -= total;
      if (current < 0 && Carousel.params.paginationType !== 'bullets') current = total + current;
    } else if (typeof Carousel.snapIndex !== 'undefined') {
      current = Carousel.snapIndex;
    } else {
      current = Carousel.activeIndex || 0;
    }
    // Types
    if (
      params.type === 'bullets' &&
      Carousel.pagination.bullets &&
      Carousel.pagination.bullets.length > 0
    ) {
      const bullets = Carousel.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = bullets.eq(0)[Carousel.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(
          Carousel.isHorizontal() ? 'width' : 'height',
          `${bulletSize * (params.dynamicMainBullets + 4)}px`,
        );
        if (params.dynamicMainBullets > 1 && Carousel.previousIndex !== undefined) {
          dynamicBulletIndex += current - (Carousel.previousIndex - Carousel.loopedSlides || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.removeClass(
        ['', '-next', '-next-next', '-prev', '-prev-prev', '-main']
          .map((suffix) => `${params.bulletActiveClass}${suffix}`)
          .join(' '),
      );
      if ($el.length > 1) {
        bullets.each((bullet) => {
          const $bullet = $(bullet);
          const bulletIndex = $bullet.index();
          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass(`${params.bulletActiveClass}-main`);
            }
            if (bulletIndex === firstIndex) {
              setSideBullets($bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets($bullet, 'next');
            }
          }
        });
      } else {
        const $bullet = bullets.eq(current);
        const bulletIndex = $bullet.index();
        $bullet.addClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          const $firstDisplayedBullet = bullets.eq(firstIndex);
          const $lastDisplayedBullet = bullets.eq(lastIndex);
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
          }
          if (Carousel.params.loop) {
            if (bulletIndex >= bullets.length) {
              for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
              }
              bullets
                .eq(bullets.length - params.dynamicMainBullets - 1)
                .addClass(`${params.bulletActiveClass}-prev`);
            } else {
              setSideBullets($firstDisplayedBullet, 'prev');
              setSideBullets($lastDisplayedBullet, 'next');
            }
          } else {
            setSideBullets($firstDisplayedBullet, 'prev');
            setSideBullets($lastDisplayedBullet, 'next');
          }
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset =
          (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? 'right' : 'left';
        bullets.css(Carousel.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
      }
    }
    if (params.type === 'fraction') {
      $el
        .find(classesToSelector(params.currentClass))
        .text(params.formatFractionCurrent(current + 1));
      $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
    }
    if (params.type === 'progressbar') {
      let progressbarDirection;
      if (params.progressbarOpposite) {
        progressbarDirection = Carousel.isHorizontal() ? 'vertical' : 'horizontal';
      } else {
        progressbarDirection = Carousel.isHorizontal() ? 'horizontal' : 'vertical';
      }
      const scale = (current + 1) / total;
      let scaleX = 1;
      let scaleY = 1;
      if (progressbarDirection === 'horizontal') {
        scaleX = scale;
      } else {
        scaleY = scale;
      }
      $el
        .find(classesToSelector(params.progressbarFillClass))
        .transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`)
        .transition(Carousel.params.speed);
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(Carousel, current + 1, total));
      emit('paginationRender', $el[0]);
    } else {
      emit('paginationUpdate', $el[0]);
    }
    if (Carousel.params.watchOverflow && Carousel.enabled) {
      $el[Carousel.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
  }
  function render() {
    // Render Container
    const params = Carousel.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength =
      Carousel.virtual && Carousel.params.virtual.enabled
        ? Carousel.virtual.slides.length
        : Carousel.slides.length;

    const $el = Carousel.pagination.$el;
    let paginationHTML = '';
    if (params.type === 'bullets') {
      let numberOfBullets = Carousel.params.loop
        ? Math.ceil((slidesLength - Carousel.loopedSlides * 2) / Carousel.params.slidesPerGroup)
        : Carousel.snapGrid.length;
      if (
        Carousel.params.freeMode &&
        Carousel.params.freeMode.enabled &&
        !Carousel.params.loop &&
        numberOfBullets > slidesLength
      ) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(Carousel, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
      $el.html(paginationHTML);

      Carousel.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(Carousel, params.currentClass, params.totalClass);
      } else {
        paginationHTML =
          `<span class="${params.currentClass}"></span>` +
          ' / ' +
          `<span class="${params.totalClass}"></span>`;
      }
      $el.html(paginationHTML);
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(Carousel, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
      $el.html(paginationHTML);
    }
    if (params.type !== 'custom') {
      emit('paginationRender', Carousel.pagination.$el[0]);
    }
  }
  function init() {
    Carousel.params.pagination = createElementIfNotDefined(
      Carousel,
      Carousel.originalParams.pagination,
      Carousel.params.pagination,
      { el: 'Carousel-pagination' },
    );
    const params = Carousel.params.pagination;
    if (!params.el) return;

    let $el = $(params.el);
    if ($el.length === 0) return;

    if (Carousel.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
      $el = Carousel.$el.find(params.el);
      // check if it belongs to another nested Carousel
      if ($el.length > 1) {
        $el = $el.filter((el) => {
          if ($(el).parents('.Carousel')[0] !== Carousel.el) return false;
          return true;
        });
      }
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);
    $el.addClass(Carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);

    if (params.type === 'bullets' && params.dynamicBullets) {
      $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
      dynamicBulletIndex = 0;
      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }
    if (params.type === 'progressbar' && params.progressbarOpposite) {
      $el.addClass(params.progressbarOppositeClass);
    }

    if (params.clickable) {
      $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
        e.preventDefault();
        let index = $(this).index() * Carousel.params.slidesPerGroup;
        if (Carousel.params.loop) index += Carousel.loopedSlides;
        Carousel.slideTo(index);
      });
    }

    Object.assign(Carousel.pagination, {
      $el,
      el: $el[0],
    });

    if (!Carousel.enabled) {
      $el.addClass(params.lockClass);
    }
  }
  function destroy() {
    const params = Carousel.params.pagination;
    if (isPaginationDisabled()) return;
    const $el = Carousel.pagination.$el;

    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    $el.removeClass(Carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);
    if (Carousel.pagination.bullets && Carousel.pagination.bullets.removeClass)
      Carousel.pagination.bullets.removeClass(params.bulletActiveClass);
    if (params.clickable) {
      $el.off('click', classesToSelector(params.bulletClass));
    }
  }

  on('init', () => {
    if (Carousel.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (Carousel.params.loop) {
      update();
    } else if (typeof Carousel.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    if (!Carousel.params.loop) {
      update();
    }
  });
  on('slidesLengthChange', () => {
    if (Carousel.params.loop) {
      render();
      update();
    }
  });
  on('snapGridLengthChange', () => {
    if (!Carousel.params.loop) {
      render();
      update();
    }
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const { $el } = Carousel.pagination;
    if ($el) {
      $el[Carousel.enabled ? 'removeClass' : 'addClass'](Carousel.params.pagination.lockClass);
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e) => {
    const targetEl = e.target;
    const { $el } = Carousel.pagination;
    if (
      Carousel.params.pagination.el &&
      Carousel.params.pagination.hideOnClick &&
      $el &&
      $el.length > 0 &&
      !$(targetEl).hasClass(Carousel.params.pagination.bulletClass)
    ) {
      if (
        Carousel.navigation &&
        ((Carousel.navigation.nextEl && targetEl === Carousel.navigation.nextEl) ||
          (Carousel.navigation.prevEl && targetEl === Carousel.navigation.prevEl))
      )
        return;
      const isHidden = $el.hasClass(Carousel.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      $el.toggleClass(Carousel.params.pagination.hiddenClass);
    }
  });

  const enable = () => {
    Carousel.$el.removeClass(Carousel.params.pagination.paginationDisabledClass);
    if (Carousel.pagination.$el) {
      Carousel.pagination.$el.removeClass(Carousel.params.pagination.paginationDisabledClass);
    }
    init();
    render();
    update();
  };

  const disable = () => {
    Carousel.$el.addClass(Carousel.params.pagination.paginationDisabledClass);
    if (Carousel.pagination.$el) {
      Carousel.pagination.$el.addClass(Carousel.params.pagination.paginationDisabledClass);
    }
    destroy();
  };

  Object.assign(Carousel.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy,
  });
}
