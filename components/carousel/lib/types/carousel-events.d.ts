import { carouselOptions } from './carousel-options';
import { ICarousel } from './carousel-class';

import { A11yEvents } from './modules/a11y';
import { AutoplayEvents } from './modules/autoplay';
import { ControllerEvents } from './modules/controller';
import { CoverflowEffectEvents } from './modules/effect-coverflow';
import { CubeEffectEvents } from './modules/effect-cube';
import { FadeEffectEvents } from './modules/effect-fade';
import { FlipEffectEvents } from './modules/effect-flip';
import { CreativeEffectEvents } from './modules/effect-creative';
import { CardsEffectEvents } from './modules/effect-cards';
import { HashNavigationEvents } from './modules/hash-navigation';
import { HistoryEvents } from './modules/history';
import { KeyboardEvents } from './modules/keyboard';
import { LazyEvents } from './modules/lazy';
import { MousewheelEvents } from './modules/mousewheel';
import { NavigationEvents } from './modules/navigation';
import { PaginationEvents } from './modules/pagination';
import { ParallaxEvents } from './modules/parallax';
import { ScrollbarEvents } from './modules/scrollbar';
import { ThumbsEvents } from './modules/thumbs';
import { VirtualEvents } from './modules/virtual';
import { ZoomEvents } from './modules/zoom';
import { FreeModeEvents } from './modules/free-mode';

export interface CarouselEvents {
  // CORE_EVENTS_START
  /**
   * Fired right after carousel initialization.
   * @note Note that with `carousel.on('init')` syntax it will
   * work only in case you set `init: false` parameter.
   *
   * @example
   * ```js
   * const carousel = new carousel('.vts-carousel', {
   *   init: false,
   *   // other parameters
   * });
   * carousel.on('init', function() {
   *  // do something
   * });
   * // init carousel
   * carousel.init();
   * ```
   *
   * @example
   * ```js
   * // Otherwise use it as the parameter:
   * const carousel = new carousel('.vts-carousel', {
   *   // other parameters
   *   on: {
   *     init: function () {
   *       // do something
   *     },
   *   }
   * });
   * ```
   */
  init: (carousel: ICarousel) => any;

  /**
   * Event will be fired right before carousel destroyed
   */
  beforeDestroy: (carousel: ICarousel) => void;

  /**
   * Event will be fired when currently active slide is changed
   */
  slideChange: (carousel: ICarousel) => void;

  /**
   * Event will be fired in the beginning of animation to other slide (next or previous).
   */
  slideChangeTransitionStart: (carousel: ICarousel) => void;

  /**
   * Event will be fired after animation to other slide (next or previous).
   */
  slideChangeTransitionEnd: (carousel: ICarousel) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "forward" direction only
   */
  slideNextTransitionStart: (carousel: ICarousel) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "forward" direction only
   */
  slideNextTransitionEnd: (carousel: ICarousel) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "backward" direction only
   */
  slidePrevTransitionStart: (carousel: ICarousel) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "backward" direction only
   */
  slidePrevTransitionEnd: (carousel: ICarousel) => void;

  /**
   * Event will be fired in the beginning of transition.
   */
  transitionStart: (carousel: ICarousel) => void;

  /**
   * Event will be fired after transition.
   */
  transitionEnd: (carousel: ICarousel) => void;

  /**
   * Event will be fired when user touch carousel. Receives `touchstart` event as an arguments.
   */
  touchStart: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over carousel. Receives `touchmove` event as an arguments.
   */
  touchMove: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over carousel in direction opposite to direction parameter. Receives `touchmove` event as an arguments.
   */
  touchMoveOpposite: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over carousel and move it. Receives `touchmove` event as an arguments.
   */
  sliderMove: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user release carousel. Receives `touchend` event as an arguments.
   */
  touchEnd: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on carousel. Receives `touchend` event as an arguments.
   */
  click: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on carousel. Receives `touchend` event as an arguments.
   */
  tap: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user double tap on carousel's container. Receives `touchend` event as an arguments
   */
  doubleTap: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired right after all inner images are loaded. updateOnImagesReady should be also enabled
   */
  imagesReady: (carousel: ICarousel) => void;

  /**
   * Event will be fired when carousel progress is changed, as an arguments it receives progress that is always from 0 to 1
   */
  progress: (carousel: ICarousel, progress: number) => void;

  /**
   * Event will be fired when carousel reach its beginning (initial position)
   */
  reachBeginning: (carousel: ICarousel) => void;

  /**
   * Event will be fired when carousel reach last slide
   */
  reachEnd: (carousel: ICarousel) => void;

  /**
   * Event will be fired when carousel goes to beginning or end position
   */
  toEdge: (carousel: ICarousel) => void;

  /**
   * Event will be fired when carousel goes from beginning or end position
   */
  fromEdge: (carousel: ICarousel) => void;

  /**
   * Event will be fired when carousel's wrapper change its position. Receives current translate value as an arguments
   */
  setTranslate: (carousel: ICarousel, translate: number) => void;

  /**
   * Event will be fired everytime when carousel starts animation. Receives current transition duration (in ms) as an arguments
   */
  setTransition: (carousel: ICarousel, transition: number) => void;

  /**
   * Event will be fired on window resize right before carousel's onresize manipulation
   */
  resize: (carousel: ICarousel) => void;

  /**
   * Event will be fired if observer is enabled and it detects DOM mutations
   */
  observerUpdate: (carousel: ICarousel) => void;

  /**
   * Event will be fired right before "loop fix"
   */
  beforeLoopFix: (carousel: ICarousel) => void;

  /**
   * Event will be fired after "loop fix"
   */
  loopFix: (carousel: ICarousel) => void;

  /**
   * Event will be fired on breakpoint change
   */
  breakpoint: (carousel: ICarousel, breakpointParams: carouselOptions) => void;

  /**
   * !INTERNAL: Event will fired right before breakpoint change
   */
  _beforeBreakpoint?: (carousel: ICarousel, breakpointParams: carouselOptions) => void;

  /**
   * !INTERNAL: Event will fired after setting CSS classes on carousel container element
   */
  _containerClasses?: (carousel: ICarousel, classNames: string) => void;

  /**
   * !INTERNAL: Event will fired after setting CSS classes on carousel slide element
   */
  _slideClass?: (carousel: ICarousel, slideEl: HTMLElement, classNames: string) => void;

  /**
   * !INTERNAL: Event will fired after setting CSS classes on all carousel slides
   */
  _slideClasses?: (
    carousel: ICarousel,
    slides: { slideEl: HTMLElement; classNames: string; index: number }[]
  ) => void;

  /**
   * !INTERNAL: Event will fired as soon as carousel instance available (before init)
   */
  _carousel?: (carousel: ICarousel) => void;

  /**
   * !INTERNAL: Event will be fired on free mode touch end (release) and there will no be momentum
   */
  _freeModeNoMomentumRelease?: (carousel: ICarousel) => void;

  /**
   * Event will fired on active index change
   */
  activeIndexChange: (carousel: ICarousel) => void;
  /**
   * Event will fired on snap index change
   */
  snapIndexChange: (carousel: ICarousel) => void;
  /**
   * Event will fired on real index change
   */
  realIndexChange: (carousel: ICarousel) => void;
  /**
   * Event will fired right after initialization
   */
  afterInit: (carousel: ICarousel) => void;
  /**
   * Event will fired right before initialization
   */
  beforeInit: (carousel: ICarousel) => void;
  /**
   * Event will fired before resize handler
   */
  beforeResize: (carousel: ICarousel) => void;
  /**
   * Event will fired before slide change transition start
   */
  beforeSlideChangeStart: (carousel: ICarousel) => void;
  /**
   * Event will fired before transition start
   */
  beforeTransitionStart: (carousel: ICarousel, speed: number, internal: any) => void; // what is internal?
  /**
   * Event will fired on direction change
   */
  changeDirection: (carousel: ICarousel) => void;
  /**
   * Event will be fired when user double click/tap on carousel
   */
  doubleClick: (carousel: ICarousel, event: MouseEvent | TouchEvent | PointerEvent) => void;
  /**
   * Event will be fired on carousel destroy
   */
  destroy: (carousel: ICarousel) => void;
  /**
   * Event will be fired on momentum bounce
   */
  momentumBounce: (carousel: ICarousel) => void;
  /**
   * Event will be fired on orientation change (e.g. landscape -> portrait)
   */
  orientationchange: (carousel: ICarousel) => void;
  /**
   * Event will be fired in the beginning of animation of resetting slide to current one
   */
  slideResetTransitionStart: (carousel: ICarousel) => void;
  /**
   * Event will be fired in the end of animation of resetting slide to current one
   */
  slideResetTransitionEnd: (carousel: ICarousel) => void;
  /**
   * Event will be fired with first touch/drag move
   */
  sliderFirstMove: (carousel: ICarousel, event: TouchEvent) => void;
  /**
   * Event will be fired when number of slides has changed
   */
  slidesLengthChange: (carousel: ICarousel) => void;
  /**
   * Event will be fired when slides grid has changed
   */
  slidesGridLengthChange: (carousel: ICarousel) => void;
  /**
   * Event will be fired when snap grid has changed
   */
  snapGridLengthChange: (carousel: ICarousel) => void;
  /**
   * Event will be fired after carousel.update() call
   */
  update: (carousel: ICarousel) => void;
  /**
   * Event will be fired when carousel is locked (when `watchOverflow` enabled)
   */
  lock: (carousel: ICarousel) => void;
  /**
   * Event will be fired when carousel is unlocked (when `watchOverflow` enabled)
   */
  unlock: (carousel: ICarousel) => void;
  // CORE_EVENTS_END
}

interface CarouselEvents extends A11yEvents {}
interface CarouselEvents extends AutoplayEvents {}
interface CarouselEvents extends ControllerEvents {}
interface CarouselEvents extends CoverflowEffectEvents {}
interface CarouselEvents extends CubeEffectEvents {}
interface CarouselEvents extends FadeEffectEvents {}
interface CarouselEvents extends FlipEffectEvents {}
interface CarouselEvents extends CreativeEffectEvents {}
interface CarouselEvents extends CardsEffectEvents {}
interface CarouselEvents extends HashNavigationEvents {}
interface CarouselEvents extends HistoryEvents {}
interface CarouselEvents extends KeyboardEvents {}
interface CarouselEvents extends LazyEvents {}
interface CarouselEvents extends MousewheelEvents {}
interface CarouselEvents extends NavigationEvents {}
interface CarouselEvents extends PaginationEvents {}
interface CarouselEvents extends ParallaxEvents {}
interface CarouselEvents extends ScrollbarEvents {}
interface CarouselEvents extends ThumbsEvents {}
interface CarouselEvents extends VirtualEvents {}
interface CarouselEvents extends ZoomEvents {}
interface CarouselEvents extends FreeModeEvents {}
