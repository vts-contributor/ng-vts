//@ts-nocheck
import { setCSSProperty } from '../../shared/utils';

export default function updateSlides() {
  const carousel = this;
  function getDirectionLabel(property) {
    if (carousel.isHorizontal()) {
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

  const params = carousel.params;

  const { $wrapperEl, size: carouselSize, rtlTranslate: rtl, wrongRTL } = carousel;
  const isVirtual = carousel.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? carousel.virtual.slides.length : carousel.slides.length;
  const slides = $wrapperEl.children(`.${carousel.params.slideClass}`);
  const slidesLength = isVirtual ? carousel.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];

  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(carousel);
  }

  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(carousel);
  }

  const previousSnapGridLength = carousel.snapGrid.length;
  const previousSlidesGridLength = carousel.slidesGrid.length;

  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof carouselSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * carouselSize;
  }

  carousel.virtualSize = -spaceBetween;

  // reset margins
  if (rtl) slides.css({ marginLeft: '', marginBottom: '', marginTop: '' });
  else slides.css({ marginRight: '', marginBottom: '', marginTop: '' });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(carousel.wrapperEl, '--carousel-centered-offset-before', '');
    setCSSProperty(carousel.wrapperEl, '--carousel-centered-offset-after', '');
  }

  const gridEnabled = params.grid && params.grid.rows > 1 && carousel.grid;
  if (gridEnabled) {
    carousel.grid.initSlides(slidesLength);
  }

  // Calc slides
  let slideSize;

  const shouldResetSlideSize =
    params.slidesPerView === 'auto' &&
    params.breakpoints &&
    Object.keys(params.breakpoints).filter(key => {
      return typeof params.breakpoints[key].slidesPerView !== 'undefined';
    }).length > 0;

  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide = slides.eq(i);
    if (gridEnabled) {
      carousel.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
    }
    if (slide.css('display') === 'none') continue; // eslint-disable-line

    if (params.slidesPerView === 'auto') {
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
        slideSize = carousel.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
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
      slideSize = (carouselSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);

      if (slides[i]) {
        // Reset
        slides[i].style['width'] = '';
        slides[i].style['height'] = '';
        slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].carouselSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);

    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - carouselSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - carouselSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (
        (index - Math.min(carousel.params.slidesPerGroupSkip, index)) %
          carousel.params.slidesPerGroup ===
        0
      )
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    carousel.virtualSize += slideSize + spaceBetween;

    prevSlideSize = slideSize;

    index += 1;
  }
  carousel.virtualSize = Math.max(carousel.virtualSize, carouselSize) + offsetAfter;

  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({ width: `${carousel.virtualSize + params.spaceBetween}px` });
  }
  if (params.setWrapperSize) {
    $wrapperEl.css({
      [getDirectionLabel('width')]: `${carousel.virtualSize + params.spaceBetween}px`
    });
  }

  if (gridEnabled) {
    carousel.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= carousel.virtualSize - carouselSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;

    if (
      Math.floor(carousel.virtualSize - carouselSize) - Math.floor(snapGrid[snapGrid.length - 1]) >
      1
    ) {
      snapGrid.push(carousel.virtualSize - carouselSize);
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];

  if (params.spaceBetween !== 0) {
    const key = carousel.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
    slides
      .filter((_, slideIndex) => {
        if (!params.cssMode) return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      })
      .css({ [key]: `${spaceBetween}px` });
  }

  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    const maxSnap = allSlidesSize - carouselSize;
    snapGrid = snapGrid.map(snap => {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }

  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    if (allSlidesSize < carouselSize) {
      const allSlidesOffset = (carouselSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }

  Object.assign(carousel, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });

  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(carousel.wrapperEl, '--carousel-centered-offset-before', `${-snapGrid[0]}px`);
    setCSSProperty(
      carousel.wrapperEl,
      '--carousel-centered-offset-after',
      `${carousel.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`
    );
    const addToSnapGrid = -carousel.snapGrid[0];
    const addToSlidesGrid = -carousel.slidesGrid[0];
    carousel.snapGrid = carousel.snapGrid.map(v => v + addToSnapGrid);
    carousel.slidesGrid = carousel.slidesGrid.map(v => v + addToSlidesGrid);
  }

  if (slidesLength !== previousSlidesLength) {
    carousel.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (carousel.params.watchOverflow) carousel.checkOverflow();
    carousel.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    carousel.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress) {
    carousel.updateSlidesOffset();
  }

  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = carousel.$el.hasClass(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) carousel.$el.addClass(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      carousel.$el.removeClass(backFaceHiddenClass);
    }
  }
}
