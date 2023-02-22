import { Dom7Array } from 'dom7';
import { CarouselOptions } from './Carousel-options';
import { CSSSelector, CarouselModule } from './shared';
import { CarouselEvents } from './Carousel-events';

import { A11yMethods } from './modules/a11y';
import { AutoplayMethods } from './modules/autoplay';
import { ControllerMethods } from './modules/controller';
import { CoverflowEffectMethods } from './modules/effect-coverflow';
import { CubeEffectMethods } from './modules/effect-cube';
import { FadeEffectMethods } from './modules/effect-fade';
import { FlipEffectMethods } from './modules/effect-flip';
import { CreativeEffectMethods } from './modules/effect-creative';
import { CardsEffectMethods } from './modules/effect-cards';
import { HashNavigationMethods } from './modules/hash-navigation';
import { HistoryMethods } from './modules/history';
import { KeyboardMethods } from './modules/keyboard';
import { LazyMethods } from './modules/lazy';
import { MousewheelMethods } from './modules/mousewheel';
import { NavigationMethods } from './modules/navigation';
import { PaginationMethods } from './modules/pagination';
import { ParallaxMethods } from './modules/parallax';
import { ScrollbarMethods } from './modules/scrollbar';
import { ThumbsMethods } from './modules/thumbs';
import { VirtualMethods } from './modules/virtual';
import { ZoomMethods } from './modules/zoom';
import { FreeModeMethods } from './modules/free-mode';
import { ManipulationMethods } from './modules/manipulation';

interface CarouselClass<Events> {
  /** Add event handler */
  on<E extends keyof Events>(event: E, handler: Events[E]): void;
  /** Add event handler that will be removed after it was fired */
  once<E extends keyof Events>(event: E, handler: Events[E]): void;
  /** Remove event handler */
  off<E extends keyof Events>(event: E, handler: Events[E]): void;
  /** Remove all handlers for specified event */
  off<E extends keyof Events>(event: E): void;
  /** Fire event on instance */
  emit<E extends keyof Events>(event: E, ...args: any[]): void;
}

interface Carousel extends CarouselClass<CarouselEvents> {
  /**
   * Object with passed initialization parameters
   */
  params: CarouselOptions;

  /**
   * Object with original initialization parameters
   */
  originalParams: CarouselOptions;

  /**
   * Dom7 element with slider container HTML element. To get vanilla HTMLElement use `Carousel.el`
   */
  $el: Dom7Array;

  /**
   * Slider container HTML element
   */
  el: HTMLElement;

  /**
   * Dom7 element with slider wrapper HTML element. To get vanilla HTMLElement use `Carousel.wrapperEl`
   */
  $wrapperEl: Dom7Array;

  /**
   * Wrapper HTML element
   */
  wrapperEl: HTMLElement;

  /**
   * Dom7 array-like collection of slides HTML elements. To get specific slide HTMLElement use `Carousel.slides[1]`
   */
  slides: Dom7Array;

  /**
   * !INTERNAL
   */
  loopedSlides: number | null;

  /**
   * Width of container
   */
  width: number;

  /**
   * Height of container
   */
  height: number;

  /**
   * Current value of wrapper translate
   */
  translate: number;

  /**
   * Current progress of wrapper translate (from 0 to 1)
   */
  progress: number;

  /**
   * Index number of currently active slide
   *
   * @note Note, that in loop mode active index value will be always shifted on a number of looped/duplicated slides
   */
  activeIndex: number;

  /**
   * Index number of currently active slide considering duplicated slides in loop mode
   */
  realIndex: number;

  /**
   * Index number of previously active slide
   */
  previousIndex: number;

  /**
   * Index number of current snap in `snapGrid`
   */
  snapIndex: number;

  /**
   * Slides snap grid
   */
  snapGrid: number[];

  /**
   * `true` if slider on most "left"/"top" position
   */
  isBeginning: boolean;

  /**
   * `true` if slider on most "right"/"bottom" position
   */
  isEnd: boolean;

  /**
   * `true` if slide is "locked" (by `watchOverflow`) and slides can not be, e.g. when amount of slides is less that slides per view
   */
  isLocked: boolean;

  /**
   * `true` if Carousel is in transition
   */
  animating: boolean;

  /**
   * Object with the following touch event properties:
   *
   * - `Carousel.touches.startX`
   * - `Carousel.touches.startY`
   * - `Carousel.touches.currentX`
   * - `Carousel.touches.currentY`
   * - `Carousel.touches.diff`
   */
  touches: {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    diff: number;
  };

  /**
   * Index number of last clicked slide
   */
  clickedIndex: number;

  /**
   * Link to last clicked slide (HTMLElement)
   */
  clickedSlide: HTMLElement;

  /**
   * Disable / enable ability to slide to the next slides by assigning `false` / `true` to this property
   */
  allowSlideNext: boolean;

  /**
   * Disable / enable ability to slide to the previous slides by assigning `false` / `true` to this property
   */
  allowSlidePrev: boolean;

  /**
   * Disable / enable ability move slider by grabbing it with mouse or by touching it with finger (on touch screens) by assigning `false` / `true` to this property
   */
  allowTouchMove: boolean;

  /**
   * !INTERNAL
   */
  rtlTranslate: boolean;

  /**
   * Disable Carousel (if it was enabled). When Carousel is disabled, it will hide all navigation elements and won't respond to any events and interactions
   *
   */
  disable(): void;

  /**
   * Enable Carousel (if it was disabled)
   *
   */
  enable(): void;

  /**
   * Set Carousel translate progress (from 0 to 1). Where 0 - its initial position (offset) on first slide, and 1 - its maximum position (offset) on last slide
   *
   * @param progress Carousel translate progress (from 0 to 1).
   * @param speed Transition duration (in ms).
   */
  setProgress(progress: number, speed?: number): void;

  /**
   * Run transition to next slide.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideNext(speed?: number, runCallbacks?: boolean): void;

  /**
   * Run transition to previous slide.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slidePrev(speed?: number, runCallbacks?: boolean): void;

  /**
   * Run transition to the slide with index number equal to 'index' parameter for the
   *  duration equal to 'speed' parameter.
   *
   * @param index Index number of slide.
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideTo(index: number, speed?: number, runCallbacks?: boolean): void;

  /**
   * Does the same as .slideTo but for the case when used with enabled loop. So this
   * method will slide to slides with realIndex matching to passed index
   *
   * @param index Index number of slide.
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideToLoop(index: number, speed?: number, runCallbacks?: boolean): void;

  /**
   * Reset Carousel position to currently active slide for the duration equal to 'speed'
   * parameter.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideReset(speed?: number, runCallbacks?: boolean): void;

  /**
   * Reset Carousel position to closest slide/snap point for the duration equal to 'speed' parameter.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideToClosest(speed?: number, runCallbacks?: boolean): void;

  /**
   * Force Carousel to update its height (when autoHeight enabled) for the duration equal to
   * 'speed' parameter
   *
   * @param speed Transition duration (in ms).
   */
  updateAutoHeight(speed?: number): void;

  /**
   * You should call it after you add/remove slides
   * manually, or after you hide/show it, or do any
   * custom DOM modifications with Carousel
   * This method also includes subcall of the following
   * methods which you can use separately:
   */
  update(): void;

  /**
   * recalculate size of Carousel container
   */
  updateSize(): void;

  /**
   * recalculate number of slides and their offsets. Useful after you add/remove slides with JavaScript
   */
  updateSlides(): void;

  /**
   * recalculate Carousel progress
   */
  updateProgress(): void;

  /**
   * update active/prev/next classes on slides and bullets
   */
  updateSlidesClasses(): void;

  /**
   * Changes slider direction from horizontal to vertical and back.
   *
   * @param direction New direction. If not specified, then will automatically changed to opposite direction
   * @param needUpdate Will call Carousel.update(). Default true
   */
  changeDirection(direction?: 'horizontal' | 'vertical', needUpdate?: boolean): void;

  /**
   * Changes slider language
   *
   * @param direction New direction. Should be `rtl` or `ltr`
   */
  changeLanguageDirection(direction: 'rtl' | 'ltr'): void;

  /**
   * Detach all events listeners
   */
  detachEvents(): void;

  /**
   * Attach all events listeners again
   */
  attachEvents(): void;

  /**
   * !INTERNAL
   */
  loopCreate(): void;

  /**
   * !INTERNAL
   */
  loopDestroy(): void;

  /**
   * Initialize slider
   */
  init(el?: HTMLElement): Carousel;

  /**
   * Destroy slider instance and detach all events listeners
   *
   * @param deleteInstance Set it to false (by default it is true) to not to delete Carousel instance
   * @param cleanStyles Set it to true (by default it is true) and all custom styles will be removed from slides, wrapper and container.
   * Useful if you need to destroy Carousel and to init again with new options or in different direction
   */
  destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;

  /**
   * Set custom css3 transform's translate value for Carousel wrapper
   */
  setTranslate(translate: any): void;

  /**
   * Get current value of Carousel wrapper css3 transform translate
   */
  getTranslate(): any;

  /**
   * Animate custom css3 transform's translate value for Carousel wrapper
   *
   * @param translate Translate value (in px)
   * @param speed Transition duration (in ms)
   * @param runCallbacks Set it to false (by default it is true) and transition will not produce  transition events
   * @param translateBounds Set it to false (by default it is true) and transition value can extend beyond min and max translate
   *
   */
  translateTo(
    translate: number,
    speed: number,
    runCallbacks?: boolean,
    translateBounds?: boolean,
  ): any;

  /**
   * Unset grab cursor
   */
  unsetGrabCursor(): void;

  /**
   * Set grab cursor
   */
  setGrabCursor(): void;

  /**
   * Add event listener that will be fired on all events
   */
  onAny(handler: (eventName: string, ...args: any[]) => void): void;

  /**
   * Remove event listener that will be fired on all events
   */
  offAny(handler: (eventName: string, ...args: any[]) => void): void;

  /**
   * !INTERNAL
   */
  isHorizontal(): boolean;

  /**
   * !INTERNAL
   */
  getBreakpoint(breakpoints: CarouselOptions['breakpoints']): string;

  /**
   * !INTERNAL
   */
  setBreakpoint(): void;

  /**
   * !INTERNAL
   */
  currentBreakpoint: any;

  /**
   * !INTERNAL
   */
  destroyed: boolean;

  /**
   * !INTERNAL
   */
  modules: Array<CarouselModule>;

  a11y: A11yMethods;
  autoplay: AutoplayMethods;
  controller: ControllerMethods;
  coverflowEffect: CoverflowEffectMethods;
  cubeEffect: CubeEffectMethods;
  fadeEffect: FadeEffectMethods;
  flipEffect: FlipEffectMethods;
  creativeEffect: CreativeEffectMethods;
  cardsEffect: CardsEffectMethods;
  hashNavigation: HashNavigationMethods;
  history: HistoryMethods;
  keyboard: KeyboardMethods;
  lazy: LazyMethods;
  mousewheel: MousewheelMethods;
  navigation: NavigationMethods;
  pagination: PaginationMethods;
  parallax: ParallaxMethods;
  scrollbar: ScrollbarMethods;
  thumbs: ThumbsMethods;
  virtual: VirtualMethods;
  zoom: ZoomMethods;
  freeMode: FreeModeMethods;
}

interface Carousel extends ManipulationMethods {}

declare class Carousel implements Carousel {
  /**
   * Constructs a new Carousel instance.
   *
   * @param container Where Carousel applies to.
   * @param options   Instance options.
   */
  constructor(container: CSSSelector | HTMLElement, options?: CarouselOptions);
  /**
   * Installs modules on Carousel in runtime.
   */
  static use(modules: CarouselModule[]): void;

  /**
   * Carousel default options
   */
  static defaults: CarouselOptions;

  /**
   * Extend global Carousel defaults
   */
  static extendDefaults(options: CarouselOptions): void;

  /**
   * Object with global Carousel extended options
   */
  static extendedDefaults: CarouselOptions;
}

export default Carousel;
