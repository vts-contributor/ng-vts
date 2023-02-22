import Carousel from '../Carousel-class';

export interface ControllerMethods {
  /**
   * Pass here another Carousel instance or array with Carousel instances that should be controlled
   * by this Carousel
   */
  control?: Carousel | Carousel[];
}

export interface ControllerEvents {}

export interface ControllerOptions {
  /**
   * Pass here another Carousel instance or array with Carousel instances that should be controlled
   * by this Carousel
   */
  control?: Carousel | Carousel[];

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
