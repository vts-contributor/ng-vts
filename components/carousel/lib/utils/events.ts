import { CarouselEvents } from '../types/carousel-events'

export type IEventMappers = {
  activeIndexChange: (args: Parameters<CarouselEvents['activeIndexChange']>) => number
}

export const EventMappers: IEventMappers = {
  activeIndexChange: ([c]) => c.activeIndex
}

export const EventPerformTick = [
  'activeIndexChange',
  'slideChange'
]