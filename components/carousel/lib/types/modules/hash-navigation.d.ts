import Carousel from '../Carousel-class';

export interface HashNavigationMethods {}

export interface HashNavigationEvents {
  /**
   * Event will be fired on window hash change
   */
  hashChange: (Carousel: Carousel) => void;
  /**
   * Event will be fired when Carousel updates the hash
   */
  hashSet: (Carousel: Carousel) => void;
}

export interface HashNavigationOptions {
  /**
   * Set to `true` to enable also navigation through slides (when hashnav
   * is enabled) by browser history or by setting directly hash on document location
   *
   * @default false
   */
  watchState?: boolean;

  /**
   * Works in addition to hashnav to replace current url state with the
   * new one instead of adding it to history
   *
   * @default     false
   */
  replaceState?: boolean;
}
