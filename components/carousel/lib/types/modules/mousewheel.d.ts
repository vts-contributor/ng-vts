import carousel from '../carousel-class';
import { CSSSelector } from '../../../shared';

export interface MousewheelMethods {
  /**
   * Whether the mousewheel control is enabled
   */
  enabled: boolean;

  /**
   * Enable mousewheel control
   */
  enable(): void;

  /**
   * Disable mousewheel control
   */
  disable(): void;
}

export interface MousewheelEvents {
  /**
   * Event will be fired on mousewheel scroll
   */
  scroll: (carousel: carousel, event: WheelEvent) => void;
}

export interface MousewheelOptions {
  /**
   * Set to `true` to force mousewheel swipes to axis. So in horizontal mode mousewheel will work only with horizontal mousewheel scrolling, and only with vertical scrolling in vertical mode.

   *
   * @default false
   */
  forceToAxis?: boolean;
  /**
   * Set to `true` and carousel will release mousewheel event and allow page scrolling when carousel is on edge positions (in the beginning or in the end)

   *
   * @default false
   */
  releaseOnEdges?: boolean;
  /**
   * Set to `true` to invert sliding direction
   *
   * @default false
   */
  invert?: boolean;
  /**
   * Multiplier of mousewheel data, allows to tweak mouse wheel sensitivity
   *
   * @default 1
   */
  sensitivity?: number;
  /**
   * String with CSS selector or HTML element of the container accepting mousewheel events. By default it is carousel
   *
   * @default 'container'
   */
  eventsTarget?: 'container' | 'wrapper' | CSSSelector | HTMLElement;

  /**
   * Minimum mousewheel scroll delta to trigger carousel slide change
   *
   * @default null
   */
  thresholdDelta?: number | null;

  /**
   * Minimum mousewheel scroll time delta (in ms) to trigger carousel slide change
   *
   * @default null
   */
  thresholdTime?: number | null;
}
