/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { VtsResizeService } from './resize';

export enum VtsBreakpointEnum {
  xxxs = 'xxxs',
  xxs = 'xxs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl'
}

export type BreakpointMap = { [key in VtsBreakpointEnum]: string };
export type BreakpointBooleanMap = { [key in VtsBreakpointEnum]: boolean };
export type VtsBreakpointKey = keyof typeof VtsBreakpointEnum;

export const gridResponsiveMap: BreakpointMap = {
  xxxs: '(max-width: 359px)',
  xxs: '(min-width: 360px)',
  xs: '(min-width: 600px)',
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1200px)',
  xl: '(min-width: 1600px)'
};

export const siderResponsiveMap: BreakpointMap = {
  xxxs: '(max-width: 320px)',
  xxs: '(max-width: 359.98px)',
  xs: '(max-width: 599.98px)',
  sm: '(max-width: 767.98px)',
  md: '(max-width: 1023.98px)',
  lg: '(max-width: 1199.98px)',
  xl: '(max-width: 1599.98px)'
};

@Injectable({
  providedIn: 'root'
})
export class VtsBreakpointService {
  constructor(private resizeService: VtsResizeService, private mediaMatcher: MediaMatcher) {
    this.resizeService.subscribe().subscribe(() => {});
  }

  subscribe(breakpointMap: BreakpointMap): Observable<VtsBreakpointEnum>;
  subscribe(breakpointMap: BreakpointMap, fullMap: true): Observable<BreakpointBooleanMap>;
  subscribe(
    breakpointMap: BreakpointMap,
    fullMap?: true
  ): Observable<VtsBreakpointEnum | BreakpointBooleanMap> {
    if (fullMap) {
      const get = () => this.matchMedia(breakpointMap, true);
      return this.resizeService.subscribe().pipe(
        map(get),
        startWith(get()),
        distinctUntilChanged(
          (
            x: [VtsBreakpointEnum, BreakpointBooleanMap],
            y: [VtsBreakpointEnum, BreakpointBooleanMap]
          ) => x[0] === y[0]
        ),
        map(x => x[1])
      );
    } else {
      const get = () => this.matchMedia(breakpointMap);
      return this.resizeService
        .subscribe()
        .pipe(map(get), startWith(get()), distinctUntilChanged());
    }
  }

  private matchMedia(breakpointMap: BreakpointMap): VtsBreakpointEnum;
  private matchMedia(
    breakpointMap: BreakpointMap,
    fullMap: true
  ): [VtsBreakpointEnum, BreakpointBooleanMap];
  private matchMedia(
    breakpointMap: BreakpointMap,
    fullMap?: true
  ): VtsBreakpointEnum | [VtsBreakpointEnum, BreakpointBooleanMap] {
    let bp = VtsBreakpointEnum.md;

    const breakpointBooleanMap: Partial<BreakpointBooleanMap> = {};

    Object.keys(breakpointMap).map(breakpoint => {
      const castBP = breakpoint as VtsBreakpointEnum;
      const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;

      breakpointBooleanMap[breakpoint as VtsBreakpointEnum] = matched;

      if (matched) {
        bp = castBP;
      }
    });

    if (fullMap) {
      return [bp, breakpointBooleanMap as BreakpointBooleanMap];
    } else {
      return bp;
    }
  }
}
