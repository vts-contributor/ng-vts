import { setCSSProperty } from '../../shared/utils.js';

export default function updateSlides() {
  const Carousel = this;
  function getDirectionLabel(property) {
    if (Carousel.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom',
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }

  const params = Carousel.params;

  const { $wrapperEl, size: CarouselSize, rtlTranslate: rtl, wrongRTL } = Carousel;
  const isVirtual = Carousel.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? Carousel.virtual.slides.length : Carousel.slides.length;
  const slides = $wrapperEl.children(`.${Carousel.params.slideClass}`);
  const slidesLength = isVirtual ? Carousel.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];

  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(Carousel);
  }

  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(Carousel);
  }

  const previousSnapGridLength = Carousel.snapGrid.length;
  const previousSlidesGridLength = Carousel.slidesGrid.length;

  let vtsSpaceBetween = params.vtsSpaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof CarouselSize === 'undefined') {
    return;
  }
  if (typeof vtsSpaceBetween === 'string' && vtsSpaceBetween.indexOf('%') >= 0) {
    vtsSpaceBetween = (parseFloat(vtsSpaceBetween.replace('%', '')) / 100) * CarouselSize;
  }

  Carousel.virtualSize = -vtsSpaceBetween;

  // reset margins
  if (rtl) slides.css({ marginLeft: '', marginBottom: '', marginTop: '' });
  else slides.css({ marginRight: '', marginBottom: '', marginTop: '' });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(Carousel.wrapperEl, '--Carousel-centered-offset-before', '');
    setCSSProperty(Carousel.wrapperEl, '--Carousel-centered-offset-after', '');
  }

  const gridEnabled = params.grid && params.grid.rows > 1 && Carousel.grid;
  if (gridEnabled) {
    Carousel.grid.initSlides(slidesLength);
  }

  // Calc slides
  let slideSize;

  const shouldResetSlideSize =
    params.vtsSlidesPerView === 'auto' &&
    params.breakpoints &&
    Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].vtsSlidesPerView !== 'undefined';
    }).length > 0;

  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide = slides.eq(i);
    if (gridEnabled) {
      Carousel.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
    }
    if (slide.css('display') === 'none') continue; // eslint-disable-line

    if (params.vtsSlidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel('width')] = ``;
      }
      const slideStyles = getComputedStyle(slide[0]);
      const currentTransform = slide[0].style.transform;
      const currentWebKitTransform = slide[0].style.webkitTransform;
      if (currentTransform) {
        slide[0].style.transform = 'none';
      }
      if (currentWebKitTransform) {
        slide[0].style.webkitTransform = 'none';
      }
      if (params.roundLengths) {
        slideSize = Carousel.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
      } else {
        // eslint-disable-next-line
        const width = getDirectionPropertyValue(slideStyles, 'width');
        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        const boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          const { clientWidth, offsetWidth } = slide[0];
          slideSize =
            width +
            paddingLeft +
            paddingRight +
            marginLeft +
            marginRight +
            (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide[0].style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide[0].style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (CarouselSize - (params.vtsSlidesPerView - 1) * vtsSpaceBetween) / params.vtsSlidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);

      if (slides[i]) {
        slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].CarouselSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);

    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + vtsSpaceBetween;
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - CarouselSize / 2 - vtsSpaceBetween;
      if (i === 0) slidePosition = slidePosition - CarouselSize / 2 - vtsSpaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (
        (index - Math.min(Carousel.params.slidesPerGroupSkip, index)) %
          Carousel.params.slidesPerGroup ===
        0
      )
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + vtsSpaceBetween;
    }

    Carousel.virtualSize += slideSize + vtsSpaceBetween;

    prevSlideSize = slideSize;

    index += 1;
  }
  Carousel.virtualSize = Math.max(Carousel.virtualSize, CarouselSize) + offsetAfter;

  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({ width: `${Carousel.virtualSize + params.vtsSpaceBetween}px` });
  }
  if (params.setWrapperSize) {
    $wrapperEl.css({
      [getDirectionLabel('width')]: `${Carousel.virtualSize + params.vtsSpaceBetween}px`,
    });
  }

  if (gridEnabled) {
    Carousel.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= Carousel.virtualSize - CarouselSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;

    if (
      Math.floor(Carousel.virtualSize - CarouselSize) - Math.floor(snapGrid[snapGrid.length - 1]) >
      1
    ) {
      snapGrid.push(Carousel.virtualSize - CarouselSize);
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];

  if (params.vtsSpaceBetween !== 0) {
    const key = Carousel.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
    slides
      .filter((_, slideIndex) => {
        if (!params.cssMode) return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      })
      .css({ [key]: `${vtsSpaceBetween}px` });
  }

  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.vtsSpaceBetween ? params.vtsSpaceBetween : 0);
    });
    allSlidesSize -= params.vtsSpaceBetween;
    const maxSnap = allSlidesSize - CarouselSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }

  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.vtsSpaceBetween ? params.vtsSpaceBetween : 0);
    });
    allSlidesSize -= params.vtsSpaceBetween;
    if (allSlidesSize < CarouselSize) {
      const allSlidesOffset = (CarouselSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }

  Object.assign(Carousel, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid,
  });

  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(Carousel.wrapperEl, '--Carousel-centered-offset-before', `${-snapGrid[0]}px`);
    setCSSProperty(
      Carousel.wrapperEl,
      '--Carousel-centered-offset-after',
      `${Carousel.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`,
    );
    const addToSnapGrid = -Carousel.snapGrid[0];
    const addToSlidesGrid = -Carousel.slidesGrid[0];
    Carousel.snapGrid = Carousel.snapGrid.map((v) => v + addToSnapGrid);
    Carousel.slidesGrid = Carousel.slidesGrid.map((v) => v + addToSlidesGrid);
  }

  if (slidesLength !== previousSlidesLength) {
    Carousel.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (Carousel.params.watchOverflow) Carousel.checkOverflow();
    Carousel.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    Carousel.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress) {
    Carousel.updateSlidesOffset();
  }

  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = Carousel.$el.hasClass(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) Carousel.$el.addClass(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      Carousel.$el.removeClass(backFaceHiddenClass);
    }
  }
}
