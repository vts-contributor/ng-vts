/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, QueryList } from '@angular/core';
import { VtsCarouselContentDirective } from './carousel-content.directive';
import { VtsCarouselBaseStrategy } from './strategies/base-strategy';

export type VtsCarouselEffects = 'fade' | 'scrollx' | string;
export type VtsCarouselDotPosition = 'top' | 'bottom' | 'left' | 'right' | string;

export interface VtsCarouselComponentAsSource {
  carouselContents: QueryList<VtsCarouselContentDirective>;
  el: HTMLElement;
  vtsTransitionSpeed: number;
  vertical: boolean;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  activeIndex: number;
  dir: Direction;
}

export interface VtsCarouselStrategyRegistryItem {
  name: string;
  strategy: VtsCarouselBaseStrategy;
}

export const VTS_CAROUSEL_CUSTOM_STRATEGIES = new InjectionToken<VtsCarouselStrategyRegistryItem[]>(
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
