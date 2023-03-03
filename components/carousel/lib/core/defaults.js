export default {
  init: true,
  vtsDirection: 'horizontal',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  vtsSpeed: 300,
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
  vtsEdgeSwipeDetection: false,
  vtsEdgeSwipeThreshold: 20,

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

  // Disable carousel and hide navigation when container not overflow
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
  vtsLoop: false,
  vtsLoopAdditionalSlides: 0,
  vtsLoopedSlides: null,
  loopedSlidesLimit: true,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,

  // rewind
  rewind: false,

  // Swiping/no swiping
  vtsAllowSlidePrev: true,
  vtsAllowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'carousel-no-swiping',
  noSwipingSelector: null,

  // Passive Listeners
  passiveListeners: true,

  maxBackfaceHiddenSlides: 10,

  // NS
  containerModifierClass: 'carousel-', // NEW
  vtsSlideClass: 'carousel-slide',
  slideBlankClass: 'carousel-slide-invisible-blank',
  slideActiveClass: 'carousel-slide-active',
  slideDuplicateActiveClass: 'carousel-slide-duplicate-active',
  slideVisibleClass: 'carousel-slide-visible',
  vtsSlideDuplicateClass: 'carousel-slide-duplicate',
  slideNextClass: 'carousel-slide-next',
  slideDuplicateNextClass: 'carousel-slide-duplicate-next',
  slidePrevClass: 'carousel-slide-prev',
  slideDuplicatePrevClass: 'carousel-slide-duplicate-prev',
  vtsWrapperClass: 'carousel-wrapper',

  // Callbacks
  runCallbacksOnInit: true,

  // Internals
  _emitClasses: false,
};
