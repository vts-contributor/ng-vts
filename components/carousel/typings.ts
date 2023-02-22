/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, QueryList } from '@angular/core';
import { VtscarouselContentDirective } from './carousel-content.directive';
import { VtscarouselBaseStrategy } from './strategies/base-strategy';

export type VtscarouselEffects = 'fade' | 'scrollx' | string;
export type VtscarouselDotPosition = 'top' | 'bottom' | 'left' | 'right' | string;

export interface VtscarouselComponentAsSource {
  carouselContents: QueryList<VtscarouselContentDirective>;
  el: HTMLElement;
  vtsTransitionSpeed: number;
  vertical: boolean;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  activeIndex: number;
  dir: Direction;
}

export interface VtscarouselStrategyRegistryItem {
  name: string;
  strategy: VtscarouselBaseStrategy;
}

export const VTS_carousel_CUSTOM_STRATEGIES = new InjectionToken<VtscarouselStrategyRegistryItem[]>(
  'vts-carousel-custom-strategies'
);

export interface PointerVector {
  x: number;
  y: number;
}

export interface FromToInterface {
  from: number;
  to: number;
}
