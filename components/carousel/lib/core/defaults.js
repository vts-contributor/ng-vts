export default {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',

  // Overrides
  width: null,
  height: null,

  //
  preventInteractionOnTransition: false,

  // ssr
  userAgent: null,
  url: null,

  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,

  // Autoheight
  autoHeight: false,

  // Set wrapper width
  setWrapperSize: false,

  // Virtual Translate
  virtualTranslate: false,

  // Effects
  effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',

  // Slides grid
  vtsSpaceBetween: 0,
  vtsSlidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0, // in px
  slidesOffsetAfter: 0, // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,

  // Disable Carousel and hide navigation when container not overflow
  watchOverflow: true,

  // Round length
  roundLengths: false,

  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,

  // Unique Navigation Elements
  uniqueNavElements: true,

  // Resistance
  resistance: true,
  resistanceRatio: 0.85,

  // Progress
  watchSlidesProgress: false,

  // Cursor
  grabCursor: false,

  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,

  // Images
  preloadImages: true,
  updateOnImagesReady: true,

  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopedSlidesLimit: true,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,

  // rewind
  rewind: false,

  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'Carousel-no-swiping',
  noSwipingSelector: null,

  // Passive Listeners
  passiveListeners: true,

  maxBackfaceHiddenSlides: 10,

  // NS
  containerModifierClass: 'Carousel-', // NEW
  slideClass: 'Carousel-slide',
  slideBlankClass: 'Carousel-slide-invisible-blank',
  slideActiveClass: 'Carousel-slide-active',
  slideDuplicateActiveClass: 'Carousel-slide-duplicate-active',
  slideVisibleClass: 'Carousel-slide-visible',
  slideDuplicateClass: 'Carousel-slide-duplicate',
  slideNextClass: 'Carousel-slide-next',
  slideDuplicateNextClass: 'Carousel-slide-duplicate-next',
  slidePrevClass: 'Carousel-slide-prev',
  slideDuplicatePrevClass: 'Carousel-slide-duplicate-prev',
  wrapperClass: 'Carousel-wrapper',

  // Callbacks
  runCallbacksOnInit: true,

  // Internals
  _emitClasses: false,
};
