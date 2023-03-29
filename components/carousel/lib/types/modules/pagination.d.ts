import { Dom7Array } from 'dom7';
import { CSSSelector } from '../../../shared';
import carousel from '../carousel-class';

export interface PaginationMethods {
  /**
   * HTMLElement of pagination container element
   */
  el: HTMLElement;

  /**
   * Dom7 array-like collection of pagination bullets
   * HTML elements. To get specific slide HTMLElement
   * use `carousel.pagination.bullets[1]`.
   */
  bullets: Dom7Array;

  /**
   * Render pagination layout
   */
  render(): void;

  /**
   * Update pagination state (enabled/disabled/active)
   */
  update(): void;

  /**
   * Initialize pagination
   */
  init(): void;

  /**
   * Destroy pagination
   */
  destroy(): void;
}

export interface PaginationEvents {
  /**
   * Event will be fired after pagination rendered
   */
  paginationRender: (carousel: carousel, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired when pagination updated
   */
  paginationUpdate: (carousel: carousel, paginationEl: HTMLElement) => void;

  /**
   * Event will be fired on pagination hide
   */
  paginationHide: (carousel: carousel) => void;

  /**
   * Event will be fired on pagination show
   */
  paginationShow: (carousel: carousel) => void;
}

export interface PaginationOptions {
  /**
   * Boolean property to use with breakpoints to enable/disable pagination on certain breakpoints
   */
  enabled?: boolean;
  /**
   * String with CSS selector or HTML element of the container with pagination
   *
   * @default null
   */
  el?: CSSSelector | HTMLElement | null;

  /**
   * String with type of pagination. Can be `'bullets'`, `'fraction'`, `'progressbar'`
   *
   * @default 'bullets'
   */
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';

  /**
   * Defines which HTML tag will be used to represent single pagination bullet. Only for `'bullets'` pagination type.
   *
   * @default 'span'
   */
  bulletElement?: string;

  /**
   * Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.
   *
   * @default false
   */
  dynamicBullets?: boolean;

  /**
   * The number of main bullets visible when `dynamicBullets` enabled.
   *
   * @default 1
   */
  dynamicMainBullets?: number;

  /**
   * Toggle (hide/show) pagination container visibility after click on Slider's container
   *
   * @default true
   */
  hideOnClick?: boolean;

  /**
   * If `true` then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type
   *
   * @default false
   */
  clickable?: boolean;

  /**
   * Makes pagination progressbar opposite to carousel's `direction` parameter, means vertical progressbar for horizontal carousel
   * direction and horizontal progressbar for vertical carousel direction
   *
   * @default false
   */
  progressbarOpposite?: boolean;

  /**
   * format fraction pagination current number. Function receives current number,
   * and you need to return formatted value
   */
  formatFractionCurrent?: (number: number) => number | string;

  /**
   * format fraction pagination total number. Function receives total number, and you
   * need to return formatted value
   */
  formatFractionTotal?: (number: number) => number | string;

  /**
   * This parameter allows totally customize pagination bullets, you need to pass here a function that accepts `index` number of
   * pagination bullet and required element class name (`className`). Only for `'bullets'` pagination type
   *
   * @default null
   *
   * @example
   * ```js
   * const carousel = new carousel('.vts-carousel', {
   *   //...
   *   renderBullet: function (index, className) {
   *     return '<span class="' + className + '">' + (index + 1) + '</span>';
   *   }
   * });
   * ```
   */
  renderBullet?: (index: number, className: string) => void;

  /**
   * This parameter allows to customize "fraction" pagination html. Only for `'fraction'` pagination type
   *
   * @default null
   *
   * @example
   * ```js
   * const carousel = new carousel('.vts-carousel', {
   *   //...
   *   renderFraction: function (currentClass, totalClass) {
   *       return '<span class="' + currentClass + '"></span>' +
   *               ' of ' +
   *               '<span class="' + totalClass + '"></span>';
   *   }
   * });
   * ```
   */
  renderFraction?: (currentClass: string, totalClass: string) => void;

  /**
   * This parameter allows to customize "progress" pagination. Only for `'progress'` pagination type
   *
   * @default null
   *
   * @example
   * ```js
   * const carousel = new carousel('.vts-carousel', {
   *   //...
   *   renderProgressbar: function (progressbarFillClass) {
   *       return '<span class="' + progressbarFillClass + '"></span>';
   *   }
   * });
   * ```
   */
  renderProgressbar?: (progressbarFillClass: string) => void;

  /**
   * This parameter is required for `'custom'` pagination type where you have to specify
   * how it should be rendered.
   *
   * @default null
   *
   * @example
   * ```js
   * const carousel = new carousel('.vts-carousel', {
   *   //...
   *   renderCustom: function (carousel, current, total) {
   *     return current + ' of ' + total;
   *   }
   * });
   * ```
   */
  renderCustom?: (carousel: carousel, current: number, total: number) => void;

  /**
   * CSS class name of single pagination bullet
   *
   * @default 'vts-carousel-pagination-bullet'
   */
  bulletClass?: string;

  /**
   * CSS class name of currently active pagination bullet
   *
   * @default 'vts-carousel-pagination-bullet-active'
   */
  bulletActiveClass?: string;

  /**
   * The beginning of the modifier CSS class name that will be added to pagination depending on parameters
   *
   * @default 'vts-carousel-pagination-'
   */
  modifierClass?: string;

  /**
   * CSS class name of the element with currently active index in "fraction" pagination
   *
   * @default 'vts-carousel-pagination-current'
   */
  currentClass?: string;

  /**
   * CSS class name of the element with total number of "snaps" in "fraction" pagination
   *
   * @default 'vts-carousel-pagination-total'
   */
  totalClass?: string;

  /**
   * CSS class name of pagination when it becomes inactive
   *
   * @default 'vts-carousel-pagination-hidden'
   */
  hiddenClass?: string;

  /**
   * CSS class name of pagination progressbar fill element
   *
   * @default 'vts-carousel-pagination-progressbar-fill'
   */
  progressbarFillClass?: string;

  /**
   * CSS class name of pagination progressbar opposite
   *
   * @default 'vts-carousel-pagination-progressbar-opposite'
   */
  progressbarOppositeClass?: string;
  /**
   * CSS class name set to pagination when it is clickable
   *
   * @default 'vts-carousel-pagination-clickable'
   */
  clickableClass?: string;

  /**
   * CSS class name set to pagination when it is disabled
   *
   * @default 'vts-carousel-pagination-lock'
   */
  lockClass?: string;

  /**
   * CSS class name set to pagination in horizontal carousel
   *
   * @default 'vts-carousel-pagination-horizontal'
   */
  horizontalClass?: string;

  /**
   * CSS class name set to pagination in vertical carousel
   *
   * @default 'vts-carousel-pagination-vertical'
   */
  verticalClass?: string;

  /**
   * CSS class name added on carousel container and pagination element when pagination is disabled by breakpoint
   *
   * @default 'vts-carousel-pagination-disabled'
   */
  paginationDisabledClass?: string;
}
