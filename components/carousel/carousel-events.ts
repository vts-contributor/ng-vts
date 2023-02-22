import { carouselEvents } from './lib/types';

export type EventsParams<T = carouselEvents> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? Parameters<T[P]> : never;
};
