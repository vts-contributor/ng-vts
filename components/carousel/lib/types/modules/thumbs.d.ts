import Carousel from '../Carousel-class';

export interface ThumbsMethods {
  /**
   * Carousel instance of thumbs Carousel
   */
  Carousel: Carousel;

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
   * Carousel instance of Carousel used as thumbs or object with Carousel parameters to initialize thumbs Carousel
   *
   * @default null
   */
  Carousel?: Carousel | null;
  /**
   * Additional class that will be added to activated thumbs Carousel slide
   *
   * @default 'Carousel-slide-thumb-active'
   */
  slideThumbActiveClass?: string;
  /**
   * Additional class that will be added to thumbs Carousel
   *
   * @default 'Carousel-thumbs'
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
