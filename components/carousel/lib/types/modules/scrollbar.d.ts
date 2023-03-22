import { CSSSelector } from '../../../shared';
import carousel from '../carousel-class';

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
  scrollbarDragStart: (carousel: carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag move
   */
  scrollbarDragMove: (carousel: carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired on draggable scrollbar drag end
   */
  scrollbarDragEnd: (carousel: carousel, event: MouseEvent | TouchEvent | PointerEvent) => void;
}

/**
 * Object with scrollbar parameters.
 *
 * @example
 * ```js
 * const carousel = new carousel('.vts-carousel', {
 *   scrollbar: {
 *     el: '.vts-carousel-scrollbar',
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
   * @default 'vts-carousel-scrollbar-lock'
   */
  lockClass?: string;

  /**
   * Scrollbar draggable element CSS class
   *
   * @default 'vts-carousel-scrollbar-drag'
   */
  dragClass?: string;

  /**
   * CSS class name added on carousel container and scrollbar element when scrollbar is disabled by breakpoint
   *
   * @default 'vts-carousel-scrollbar-disabled'
   */
  scrollbarDisabledClass?: string;

  /**
   * CSS class name set to scrollbar in horizontal carousel
   *
   * @default 'vts-carousel-scrollbar-horizontal'
   */
  horizontalClass?: string;

  /**
   * CSS class name set to scrollbar in vertical carousel
   *
   * @default 'vts-carousel-scrollbar-vertical'
   */
  verticalClass?: string;
}