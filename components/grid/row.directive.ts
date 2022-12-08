/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {
  gridResponsiveMap,
  VtsBreakpointKey,
  VtsBreakpointService
} from '@ui-vts/ng-vts/core/services';
import { IndexableObject } from '@ui-vts/ng-vts/core/types';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type VtsJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type VtsAlign = 'top' | 'middle' | 'bottom';

@Directive({
  selector: '[vts-row],vts-row,vts-form-item',
  exportAs: 'vtsRow',
  host: {
    '[class.vts-row-top]': `vtsAlign === 'top'`,
    '[class.vts-row-middle]': `vtsAlign === 'middle'`,
    '[class.vts-row-bottom]': `vtsAlign === 'bottom'`,
    '[class.vts-row-start]': `vtsJustify === 'start'`,
    '[class.vts-row-end]': `vtsJustify === 'end'`,
    '[class.vts-row-center]': `vtsJustify === 'center'`,
    '[class.vts-row-space-around]': `vtsJustify === 'space-around'`,
    '[class.vts-row-space-between]': `vtsJustify === 'space-between'`,
    '[class.vts-row-rtl]': `dir === "rtl"`
  }
})
export class VtsRowDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() vtsAlign: VtsAlign | null = null;
  @Input() vtsJustify: VtsJustify | null = null;
  @Input() vtsGutter:
    | string
    | number
    | IndexableObject
    | [number, number]
    | [IndexableObject, IndexableObject]
    | null = null;

  readonly actualGutter$ = new ReplaySubject<[number | null, number | null]>(1);

  dir: Direction = 'ltr';
  private readonly destroy$ = new Subject();

  getGutter(): [number | null, number | null] {
    const results: [number | null, number | null] = [null, null];
    const gutter = this.vtsGutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object' && g !== null) {
        results[index] = null;
        Object.keys(gridResponsiveMap).map((screen: string) => {
          const bp = screen as VtsBreakpointKey;
          if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
            results[index] = g![bp] as number;
          }
        });
      } else {
        results[index] = Number(g) || null;
      }
    });
    return results;
  }

  setGutterStyle(): void {
    const [horizontalGutter, verticalGutter] = this.getGutter();
    this.actualGutter$.next([horizontalGutter, verticalGutter]);
    const renderGutter = (name: string, gutter: number | null) => {
      const nativeElement = this.elementRef.nativeElement;
      if (gutter !== null) {
        this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
      }
    };
    renderGutter('margin-left', horizontalGutter);
    renderGutter('margin-right', horizontalGutter);
    renderGutter('margin-top', verticalGutter);
    renderGutter('margin-bottom', verticalGutter);
  }
  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public mediaMatcher: MediaMatcher,
    public ngZone: NgZone,
    public platform: Platform,
    private breakpointService: VtsBreakpointService,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-row');
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });

    this.setGutterStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsGutter) {
      this.setGutterStyle();
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.breakpointService
        .subscribe(gridResponsiveMap)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.setGutterStyle();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
