import carousel from '../carousel-class';

export interface ThumbsMethods {
  /**
   * carousel instance of thumbs carousel
   */
  carousel: carousel;

  /**
   * Update thumbs
   */
  update(initial: boolean): void;

  /**
   * Initialize thumbs
   */
  init(): boolean;
}

export interface ThumbsEvents {}

export interface ThumbsOptions {
  /**
   * carousel instance of carousel used as thumbs or object with carousel parameters to initialize thumbs carousel
   *
   * @default null
   */
  carousel?: carousel | null;
  /**
   * Additional class that will be added to activated thumbs carousel slide
   *
   * @default 'vts-carousel-slide-thumb-active'
   */
  slideThumbActiveClass?: string;
  /**
   * Additional class that will be added to thumbs carousel
   *
   * @default 'vts-carousel-thumbs'
   */
  thumbsContainerClass?: string;
  /**
   * When enabled multiple thumbnail slides may get activated
   *
   * @default true
   */
  multipleActiveThumbs?: boolean;
  /**
   * Allows to set on which thumbs active slide from edge it should automatically move scroll thumbs. For example, if set to 1 and last visible thumb will be activated (1 from edge) it will auto scroll thumbs

   *
   * @default 0
   */
  autoScrollOffset?: number;
}
