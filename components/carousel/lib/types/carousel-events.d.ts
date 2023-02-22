import { CarouselOptions } from './Carousel-options';
import Carousel from './Carousel-class';

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
   * Fired right after Carousel initialization.
   * @note Note that with `Carousel.on('init')` syntax it will
   * work only in case you set `init: false` parameter.
   *
   * @example
   * ```js
   * const Carousel = new Carousel('.Carousel', {
   *   init: false,
   *   // other parameters
   * });
   * Carousel.on('init', function() {
   *  // do something
   * });
   * // init Carousel
   * Carousel.init();
   * ```
   *
   * @example
   * ```js
   * // Otherwise use it as the parameter:
   * const Carousel = new Carousel('.Carousel', {
   *   // other parameters
   *   on: {
   *     init: function () {
   *       // do something
   *     },
   *   }
   * });
   * ```
   */
  init: (Carousel: Carousel) => any;

  /**
   * Event will be fired right before Carousel destroyed
   */
  beforeDestroy: (Carousel: Carousel) => void;

  /**
   * Event will be fired when currently active slide is changed
   */
  slideChange: (Carousel: Carousel) => void;

  /**
   * Event will be fired in the beginning of animation to other slide (next or previous).
   */
  slideChangeTransitionStart: (Carousel: Carousel) => void;

  /**
   * Event will be fired after animation to other slide (next or previous).
   */
  slideChangeTransitionEnd: (Carousel: Carousel) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "forward" direction only
   */
  slideNextTransitionStart: (Carousel: Carousel) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "forward" direction only
   */
  slideNextTransitionEnd: (Carousel: Carousel) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "backward" direction only
   */
  slidePrevTransitionStart: (Carousel: Carousel) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "backward" direction only
   */
  slidePrevTransitionEnd: (Carousel: Carousel) => void;

  /**
   * Event will be fired in the beginning of transition.
   */
  transitionStart: (Carousel: Carousel) => void;

  /**
   * Event will be fired after transition.
   */
  transitionEnd: (Carousel: Carousel) => void;

  /**
   * Event will be fired when user touch Carousel. Receives `touchstart` event as an arguments.
   */
  touchStart: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Carousel. Receives `touchmove` event as an arguments.
   */
  touchMove: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Carousel in direction opposite to direction parameter. Receives `touchmove` event as an arguments.
   */
  touchMoveOpposite: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Carousel and move it. Receives `touchmove` event as an arguments.
   */
  sliderMove: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user release Carousel. Receives `touchend` event as an arguments.
   */
  touchEnd: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Carousel. Receives `touchend` event as an arguments.
   */
  click: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Carousel. Receives `touchend` event as an arguments.
   */
  tap: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user double tap on Carousel's container. Receives `touchend` event as an arguments
   */
  doubleTap: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired right after all inner images are loaded. updateOnImagesReady should be also enabled
   */
  imagesReady: (Carousel: Carousel) => void;

  /**
   * Event will be fired when Carousel progress is changed, as an arguments it receives progress that is always from 0 to 1
   */
  progress: (Carousel: Carousel, progress: number) => void;

  /**
   * Event will be fired when Carousel reach its beginning (initial position)
   */
  reachBeginning: (Carousel: Carousel) => void;

  /**
   * Event will be fired when Carousel reach last slide
   */
  reachEnd: (Carousel: Carousel) => void;

  /**
   * Event will be fired when Carousel goes to beginning or end position
   */
  toEdge: (Carousel: Carousel) => void;

  /**
   * Event will be fired when Carousel goes from beginning or end position
   */
  fromEdge: (Carousel: Carousel) => void;

  /**
   * Event will be fired when Carousel's wrapper change its position. Receives current translate value as an arguments
   */
  setTranslate: (Carousel: Carousel, translate: number) => void;

  /**
   * Event will be fired everytime when Carousel starts animation. Receives current transition duration (in ms) as an arguments
   */
  setTransition: (Carousel: Carousel, transition: number) => void;

  /**
   * Event will be fired on window resize right before Carousel's onresize manipulation
   */
  resize: (Carousel: Carousel) => void;

  /**
   * Event will be fired if observer is enabled and it detects DOM mutations
   */
  observerUpdate: (Carousel: Carousel) => void;

  /**
   * Event will be fired right before "loop fix"
   */
  beforeLoopFix: (Carousel: Carousel) => void;

  /**
   * Event will be fired after "loop fix"
   */
  loopFix: (Carousel: Carousel) => void;

  /**
   * Event will be fired on breakpoint change
   */
  breakpoint: (Carousel: Carousel, breakpointParams: CarouselOptions) => void;

  /**
   * !INTERNAL: Event will fired right before breakpoint change
   */
  _beforeBreakpoint?: (Carousel: Carousel, breakpointParams: CarouselOptions) => void;

  /**
   * !INTERNAL: Event will fired after setting CSS classes on Carousel container element
   */
  _containerClasses?: (Carousel: Carousel, classNames: string) => void;

  /**
   * !INTERNAL: Event will fired after setting CSS classes on Carousel slide element
   */
  _slideClass?: (Carousel: Carousel, slideEl: HTMLElement, classNames: string) => void;

  /**
   * !INTERNAL: Event will fired after setting CSS classes on all Carousel slides
   */
  _slideClasses?: (
    Carousel: Carousel,
    slides: { slideEl: HTMLElement; classNames: string; index: number }[],
  ) => void;

  /**
   * !INTERNAL: Event will fired as soon as Carousel instance available (before init)
   */
  _Carousel?: (Carousel: Carousel) => void;

  /**
   * !INTERNAL: Event will be fired on free mode touch end (release) and there will no be momentum
   */
  _freeModeNoMomentumRelease?: (Carousel: Carousel) => void;

  /**
   * Event will fired on active index change
   */
  activeIndexChange: (Carousel: Carousel) => void;
  /**
   * Event will fired on snap index change
   */
  snapIndexChange: (Carousel: Carousel) => void;
  /**
   * Event will fired on real index change
   */
  realIndexChange: (Carousel: Carousel) => void;
  /**
   * Event will fired right after initialization
   */
  afterInit: (Carousel: Carousel) => void;
  /**
   * Event will fired right before initialization
   */
  beforeInit: (Carousel: Carousel) => void;
  /**
   * Event will fired before resize handler
   */
  beforeResize: (Carousel: Carousel) => void;
  /**
   * Event will fired before slide change transition start
   */
  beforeSlideChangeStart: (Carousel: Carousel) => void;
  /**
   * Event will fired before transition start
   */
  beforeTransitionStart: (Carousel: Carousel, speed: number, internal: any) => void; // what is internal?
  /**
   * Event will fired on direction change
   */
  changeDirection: (Carousel: Carousel) => void;
  /**
   * Event will be fired when user double click/tap on Carousel
   */
  doubleClick: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;
  /**
   * Event will be fired on Carousel destroy
   */
  destroy: (Carousel: Carousel) => void;
  /**
   * Event will be fired on momentum bounce
   */
  momentumBounce: (Carousel: Carousel) => void;
  /**
   * Event will be fired on orientation change (e.g. landscape -> portrait)
   */
  orientationchange: (Carousel: Carousel) => void;
  /**
   * Event will be fired in the beginning of animation of resetting slide to current one
   */
  slideResetTransitionStart: (Carousel: Carousel) => void;
  /**
   * Event will be fired in the end of animation of resetting slide to current one
   */
  slideResetTransitionEnd: (Carousel: Carousel) => void;
  /**
   * Event will be fired with first touch/drag move
   */
  sliderFirstMove: (Carousel: Carousel, event: TouchEvent) => void;
  /**
   * Event will be fired when number of slides has changed
   */
  slidesLengthChange: (Carousel: Carousel) => void;
  /**
   * Event will be fired when slides grid has changed
   */
  slidesGridLengthChange: (Carousel: Carousel) => void;
  /**
   * Event will be fired when snap grid has changed
   */
  snapGridLengthChange: (Carousel: Carousel) => void;
  /**
   * Event will be fired after Carousel.update() call
   */
  update: (Carousel: Carousel) => void;
  /**
   * Event will be fired when Carousel is locked (when `watchOverflow` enabled)
   */
  lock: (Carousel: Carousel) => void;
  /**
   * Event will be fired when Carousel is unlocked (when `watchOverflow` enabled)
   */
  unlock: (Carousel: Carousel) => void;
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
