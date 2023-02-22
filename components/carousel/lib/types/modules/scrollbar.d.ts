import { CSSSelector } from '../shared';
import Carousel from '../Carousel-class';

export interface ScrollbarMethods {
  /**
   * HTMLElement of Scrollbar container element
   */
  el: HTMLElement;

  /**
   * HTMLElement of Scrollbar draggable handler element
   */
  dragEl: HTMLElement;

  /**
   * Updates scrollbar track and handler sizes
   */
  updateSize(): void;

  /**
   * Updates scrollbar translate
   */
  setTranslate(): void;

  /**
   * Initialize scrollbar
   */
  init(): void;

  /**
   * Destroy scrollbar
   */
  destroy(): void;
}

export interface ScrollbarEvents {
  /**
   * Event will be fired on draggable scrollbar drag start
   */
  scrollbarDragStart: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag move
   */
  scrollbarDragMove: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag end
   */
  scrollbarDragEnd: (Carousel: Carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;
}

/**
 * Object with scrollbar parameters.
 *
 * @example
 * ```js
 * const Carousel = new Carousel('.Carousel', {
 *   scrollbar: {
 *     el: '.Carousel-scrollbar',
 *     draggable: true,
 *   },
 * });
 * ```
 */
export interface ScrollbarOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable scrollbar on certain breakpoints
   */
  enabled?: boolean;
  /**
   * String with CSS selector or HTML element of the container with scrollbar.
   *
   * @default null
   */
  el?: CSSSelector | HTMLElement | null;

  /**
   * Hide scrollbar automatically after user interaction
   *
   * @default true
   */
  hide?: boolean;

  /**
   * Set to `true` to enable make scrollbar draggable that allows you to control slider position
   *
   * @default false
   */
  draggable?: boolean;

  /**
   * Set to `true` to snap slider position to slides when you release scrollbar
   *
   * @default false
   */
  snapOnRelease?: boolean;

  /**
   * Size of scrollbar draggable element in px
   *
   * @default 'auto'
   */
  dragSize?: 'auto' | number;

  /**
   * Scrollbar element additional CSS class when it is disabled
   *
   * @default 'Carousel-scrollbar-lock'
   */
  lockClass?: string;

  /**
   * Scrollbar draggable element CSS class
   *
   * @default 'Carousel-scrollbar-drag'
   */
  dragClass?: string;

  /**
   * CSS class name added on Carousel container and scrollbar element when scrollbar is disabled by breakpoint
   *
   * @default 'Carousel-scrollbar-disabled'
   */
  scrollbarDisabledClass?: string;

  /**
   * CSS class name set to scrollbar in horizontal Carousel
   *
   * @default 'Carousel-scrollbar-horizontal'
   */
  horizontalClass?: string;

  /**
   * CSS class name set to scrollbar in vertical Carousel
   *
   * @default 'Carousel-scrollbar-vertical'
   */
  verticalClass?: string;
}
