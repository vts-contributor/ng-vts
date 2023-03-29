import { CSSSelector } from '../../../shared';
import carousel from '../carousel-class';

export interface NavigationMethods {
  /**
   * HTMLElement of "next" navigation button
   */
  nextEl: HTMLElement;

  /**
   * HTMLElement of "previous" navigation button
   */
  prevEl: HTMLElement;

  /**
   * Update navigation buttons state (enabled/disabled)
   */
  update(): void;

  /**
   * Initialize navigation
   */
  init(): void;

  /**
   * Destroy navigation
   */
  destroy(): void;
}

export interface NavigationEvents {
  /**
   * Event will be fired on navigation hide
   */
  navigationHide: (carousel: carousel) => void;
  /**
   * Event will be fired on navigation show
   */
  navigationShow: (carousel: carousel) => void;
  /**
   * Event will be fired on navigation prev button click
   */
  navigationPrev: (carousel: carousel) => void;
  /**
   * Event will be fired on navigation next button click
   */
  navigationNext: (carousel: carousel) => void;
}

export interface NavigationOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable navigation on certain breakpoints
   */
  enabled?: boolean;

  /**
   * String with CSS selector or HTML element of the element that will work
   * like "next" button after click on it
   *
   * @default null
   */
  nextEl?: CSSSelector | HTMLElement | null;

  /**
   * String with CSS selector or HTML element of the element that will work
   * like "prev" button after click on it
   *
   * @default null
   */
  prevEl?: CSSSelector | HTMLElement | null;

  /**
   * Position of navigation buttons
   *
   * @default null
   */
  position?: 'inner';

  /**
   * Toggle navigation buttons visibility after click on Slider's container
   *
   * @default false
   */
  hideOnClick?: boolean;

  /**
   * CSS class name added to navigation button when it becomes disabled
   *
   * @default 'vts-carousel-button-disabled'
   */
  disabledClass?: string;

  /**
   * CSS class name added to navigation button when it becomes hidden
   *
   * @default 'vts-carousel-button-hidden'
   */
  hiddenClass?: string;

  /**
   * CSS class name added to navigation button when it is disabled
   *
   * @default 'vts-carousel-button-lock'
   */
  lockClass?: string;

  /**
   * CSS class name added on carousel container when navigation is disabled by breakpoint
   *
   * @default 'vts-carousel-navigation-disabled'
   */
  navigationDisabledClass?: string;
}
