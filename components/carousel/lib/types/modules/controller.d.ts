import carousel from '../carousel-class';

export interface ControllerMethods {
  /**
   * Pass here another carousel instance or array with carousel instances that should be controlled
   * by this carousel
   */
  control?: carousel | carousel[];
}

export interface ControllerEvents {}

export interface ControllerOptions {
  /**
   * Pass here another carousel instance or array with carousel instances that should be controlled
   * by this carousel
   */
  control?: carousel | carousel[];

  /**
   * Set to `true` and controlling will be in inverse direction
   *
   * @default false
   */
  inverse?: boolean;

  /**
   * Defines a way how to control another slider: slide by slide
   * (with respect to other slider's grid) or depending on all slides/container
   * (depending on total slider percentage).
   *
   * @default 'slide'
   */
  by?: 'slide' | 'container';
}
