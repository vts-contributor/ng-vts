import { CarouselEvents } from './lib/types';

export type EventsParams<T = CarouselEvents> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? Parameters<T[P]> : never;
};
