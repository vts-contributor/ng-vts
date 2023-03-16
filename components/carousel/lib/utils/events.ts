import { CarouselEvents } from '../types/carousel-events';

export type IEventMappers = {
  activeIndexChange: (args: Parameters<CarouselEvents['activeIndexChange']>) => number;
  slidesLengthChange: (args: Parameters<CarouselEvents['slidesLengthChange']>) => number;
};

export const EventMappers: IEventMappers = {
  activeIndexChange: ([c]) => c.realIndex,
  slidesLengthChange: ([c]) => c.slides.length
};
