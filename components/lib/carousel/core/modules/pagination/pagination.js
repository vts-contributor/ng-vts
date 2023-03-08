import $ from '../../../shared/dom.js';
import classesToSelector from '../../../shared/classes-to-selector.js';
import createElementIfNotDefined from '../../../shared/create-element-if-not-defined.js';

export default function Pagination({ carousel, extendParams, on, emit }) {
  const pfx = 'vts-carousel-pagination';
  extendParams({
    vtsPagination: {
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

  carousel.vtsPagination = {
    el: null,
    $el: null,
    bullets: [],
  };

  let bulletSize;
  let dynamicBulletIndex = 0;

  function isPaginationDisabled() {
    return (
      !carousel.params.vtsPagination.el ||
      !carousel.vtsPagination.el ||
      !carousel.vtsPagination.$el ||
      carousel.vtsPagination.$el.length === 0
    );
  }

  function setSideBullets($bulletEl, position) {
    const { bulletActiveClass } = carousel.params.vtsPagination;
    $bulletEl[position]()
      .addClass(`${bulletActiveClass}-${position}`)
      [position]()
      .addClass(`${bulletActiveClass}-${position}-${position}`);
  }

  function update() {
    // Render || Update Pagination bullets/items
    const rtl = carousel.rtl;
    const params = carousel.params.vtsPagination;
    if (isPaginationDisabled()) return;
    const slidesLength =
      carousel.virtual && carousel.params.virtual.enabled
        ? carousel.virtual.slides.length
        : carousel.slides.length;
    const $el = carousel.vtsPagination.$el;
    // Current/Total
    let current;
    const total = carousel.params.vtsLoop
      ? Math.ceil((slidesLength - carousel.vtsLoopedSlides * 2) / carousel.params.slidesPerGroup)
      : carousel.snapGrid.length;
    if (carousel.params.vtsLoop) {
      current = Math.ceil(
        (carousel.activeIndex - carousel.vtsLoopedSlides) / carousel.params.slidesPerGroup,
      );
      if (current > slidesLength - 1 - carousel.vtsLoopedSlides * 2) {
        current -= slidesLength - carousel.vtsLoopedSlides * 2;
      }
      if (current > total - 1) current -= total;
      if (current < 0 && carousel.params.vtsPaginationType !== 'bullets') current = total + current;
    } else if (typeof carousel.snapIndex !== 'undefined') {
      current = carousel.snapIndex;
    } else {
      current = carousel.activeIndex || 0;
    }
    // Types
    if (
      params.type === 'bullets' &&
      carousel.vtsPagination.bullets &&
      carousel.vtsPagination.bullets.length > 0
    ) {
      const bullets = carousel.vtsPagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = bullets.eq(0)[carousel.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(
          carousel.isHorizontal() ? 'width' : 'height',
          `${bulletSize * (params.dynamicMainBullets + 4)}px`,
        );
        if (params.dynamicMainBullets > 1 && carousel.previousIndex !== undefined) {
          dynamicBulletIndex += current - (carousel.previousIndex - carousel.vtsLoopedSlides || 0);
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
          if (carousel.params.vtsLoop) {
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
        bullets.css(carousel.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
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
        progressbarDirection = carousel.isHorizontal() ? 'vertical' : 'horizontal';
      } else {
        progressbarDirection = carousel.isHorizontal() ? 'horizontal' : 'vertical';
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
        .transition(carousel.params.vtsSpeed);
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(carousel, current + 1, total));
      emit('paginationRender', $el[0]);
    } else {
      emit('paginationUpdate', $el[0]);
    }
    if (carousel.params.watchOverflow && carousel.enabled) {
      $el[carousel.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
  }
  function render() {
    // Render Container
    const params = carousel.params.vtsPagination;
    if (isPaginationDisabled()) return;
    const slidesLength =
      carousel.virtual && carousel.params.virtual.enabled
        ? carousel.virtual.slides.length
        : carousel.slides.length;

    const $el = carousel.vtsPagination.$el;
    let paginationHTML = '';
    if (params.type === 'bullets') {
      let numberOfBullets = carousel.params.vtsLoop
        ? Math.ceil((slidesLength - carousel.vtsLoopedSlides * 2) / carousel.params.slidesPerGroup)
        : carousel.snapGrid.length;
      if (
        carousel.params.freeMode &&
        carousel.params.freeMode.enabled &&
        !carousel.params.vtsLoop &&
        numberOfBullets > slidesLength
      ) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(carousel, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
      $el.html(paginationHTML);

      carousel.vtsPagination.bullets = $el.find(classesToSelector(params.bulletClass));
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(carousel, params.currentClass, params.totalClass);
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
        paginationHTML = params.renderProgressbar.call(carousel, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
      $el.html(paginationHTML);
    }
    if (params.type !== 'custom') {
      emit('paginationRender', carousel.vtsPagination.$el[0]);
    }
  }
  function init() {
    carousel.params.vtsPagination = createElementIfNotDefined(
      carousel,
      carousel.originalParams.vtsPagination,
      carousel.params.vtsPagination,
      { el: 'vts-carousel-pagination' },
    );
    const params = carousel.params.vtsPagination;
    if (!params.el) return;

    let $el = $(params.el);
    if ($el.length === 0) return;

    if (carousel.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
      $el = carousel.$el.find(params.el);
      // check if it belongs to another nested carousel
      if ($el.length > 1) {
        $el = $el.filter((el) => {
          if ($(el).parents('.vts-carousel')[0] !== carousel.el) return false;
          return true;
        });
      }
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);
    $el.addClass(carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);

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
        let index = $(this).index() * carousel.params.slidesPerGroup;
        if (carousel.params.vtsLoop) index += carousel.vtsLoopedSlides;
        carousel.slideTo(index);
      });
    }

    Object.assign(carousel.vtsPagination, {
      $el,
      el: $el[0],
    });

    if (!carousel.enabled) {
      $el.addClass(params.lockClass);
    }
  }
  function destroy() {
    const params = carousel.params.vtsPagination;
    if (isPaginationDisabled()) return;
    const $el = carousel.vtsPagination.$el;

    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    $el.removeClass(carousel.isHorizontal() ? params.horizontalClass : params.verticalClass);
    if (carousel.vtsPagination.bullets && carousel.vtsPagination.bullets.removeClass)
      carousel.vtsPagination.bullets.removeClass(params.bulletActiveClass);
    if (params.clickable) {
      $el.off('click', classesToSelector(params.bulletClass));
    }
  }

  on('init', () => {
    if (carousel.params.vtsPagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (carousel.params.vtsLoop) {
      update();
    } else if (typeof carousel.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    if (!carousel.params.vtsLoop) {
      update();
    }
  });
  on('slidesLengthChange', () => {
    if (carousel.params.vtsLoop) {
      render();
      update();
    }
  });
  on('snapGridLengthChange', () => {
    if (!carousel.params.vtsLoop) {
      render();
      update();
    }
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    const { $el } = carousel.vtsPagination;
    if ($el) {
      $el[carousel.enabled ? 'removeClass' : 'addClass'](carousel.params.vtsPagination.lockClass);
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e) => {
    const targetEl = e.target;
    const { $el } = carousel.vtsPagination;
    if (
      carousel.params.vtsPagination.el &&
      carousel.params.vtsPagination.hideOnClick &&
      $el &&
      $el.length > 0 &&
      !$(targetEl).hasClass(carousel.params.vtsPagination.bulletClass)
    ) {
      if (
        carousel.vtsNavigation &&
        ((carousel.vtsNavigation.nextEl && targetEl === carousel.vtsNavigation.nextEl) ||
          (carousel.vtsNavigation.prevEl && targetEl === carousel.vtsNavigation.prevEl))
      )
        return;
      const isHidden = $el.hasClass(carousel.params.vtsPagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      $el.toggleClass(carousel.params.vtsPagination.hiddenClass);
    }
  });

  const enable = () => {
    carousel.$el.removeClass(carousel.params.vtsPagination.paginationDisabledClass);
    if (carousel.vtsPagination.$el) {
      carousel.vtsPagination.$el.removeClass(carousel.params.vtsPagination.paginationDisabledClass);
    }
    init();
    render();
    update();
  };

  const disable = () => {
    carousel.$el.addClass(carousel.params.vtsPagination.paginationDisabledClass);
    if (carousel.vtsPagination.$el) {
      carousel.vtsPagination.$el.addClass(carousel.params.vtsPagination.paginationDisabledClass);
    }
    destroy();
  };

  Object.assign(carousel.vtsPagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy,
  });
}
