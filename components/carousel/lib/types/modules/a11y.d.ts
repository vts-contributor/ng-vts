export interface A11yMethods {}

export interface A11yEvents {}

export interface A11yOptions {
  /**
   * Enables A11y
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * Message for screen readers for previous button
   *
   * @default 'Previous slide'
   */
  prevSlideMessage?: string;

  /**
   * Message for screen readers for next button
   *
   * @default 'Next slide'
   */
  nextSlideMessage?: string;

  /**
   * Message for screen readers for previous button when Carousel is on first slide
   *
   * @default 'This is the first slide'
   */
  firstSlideMessage?: string;

  /**
   * Message for screen readers for next button when Carousel is on last slide
   *
   * @default 'This is the last slide'
   */
  lastSlideMessage?: string;

  /**
   * Message for screen readers for single pagination bullet
   *
   * @default 'Go to slide {{index}}'
   */
  paginationBulletMessage?: string;

  /**
   * CSS class name of A11y notification
   *
   * @default 'Carousel-notification'
   */
  notificationClass?: string;

  /**
   * Message for screen readers for outer Carousel container
   *
   * @default null
   */
  containerMessage?: string | null;

  /**
   * Message for screen readers describing the role of outer Carousel container
   *
   * @default null
   */
  containerRoleDescriptionMessage?: string | null;

  /**
   * Message for screen readers describing the role of slide element
   *
   * @default null
   */
  itemRoleDescriptionMessage?: string | null;

  /**
   * Message for screen readers describing the label of slide element
   *
   * @default '{{index}} / {{slidesLength}}'
   */
  slideLabelMessage?: string;

  /**
   * Value of Carousel slide `role` attribute
   *
   * @default 'group'
   */
  slideRole?: string;

  /**
   * Value of `id` attribute to be set on Carousel-wrapper. If `null` will be generated automatically
   *
   * @default null
   */
  id?: string | number | null;
}
