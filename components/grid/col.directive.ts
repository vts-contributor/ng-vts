/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { NgClassInterface } from '@ui-vts/ng-vts/core/types';
import { isNotNil } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsRowDirective } from './row.directive';

export interface EmbeddedProperty {
  span?: number;
  pull?: number;
  push?: number;
  offset?: number;
  order?: number;
}

@Directive({
  selector: '[vts-col],vts-col,vts-form-control,vts-form-label',
  exportAs: 'vtsCol',
  host: {
    '[style.flex]': 'hostFlexStyle'
  }
})
export class VtsColDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private classMap: { [key: string]: boolean } = {};
  private destroy$ = new Subject();
  hostFlexStyle: string | null = null;
  dir: Direction = 'ltr';
  @Input() vtsFlex: string | number | null = null;
  @Input() vtsSpan: string | number | null = null;
  @Input() vtsOrder: string | number | null = null;
  @Input() vtsOffset: string | number | null = null;
  @Input() vtsPush: string | number | null = null;
  @Input() vtsPull: string | number | null = null;
  @Input() vtsXXXs: string | number | EmbeddedProperty | null = null;
  @Input() vtsXXs: string | number | EmbeddedProperty | null = null;
  @Input() vtsXs: string | number | EmbeddedProperty | null = null;
  @Input() vtsSm: string | number | EmbeddedProperty | null = null;
  @Input() vtsMd: string | number | EmbeddedProperty | null = null;
  @Input() vtsLg: string | number | EmbeddedProperty | null = null;
  @Input() vtsXl: string | number | EmbeddedProperty | null = null;

  setHostClassMap(): void {
    const hostClassMap = {
      ['vts-col']: true,
      [`vts-col-${this.vtsSpan}`]: isNotNil(this.vtsSpan),
      [`vts-col-order-${this.vtsOrder}`]: isNotNil(this.vtsOrder),
      [`vts-col-offset-${this.vtsOffset}`]: isNotNil(this.vtsOffset),
      [`vts-col-pull-${this.vtsPull}`]: isNotNil(this.vtsPull),
      [`vts-col-push-${this.vtsPush}`]: isNotNil(this.vtsPush),
      ['vts-col-rtl']: this.dir === 'rtl',
      ...this.generateClass()
    };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(this.elementRef.nativeElement, i);
      }
    }
    this.classMap = { ...hostClassMap };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
        this.renderer.addClass(this.elementRef.nativeElement, i);
      }
    }
  }

  setHostFlexStyle(): void {
    this.hostFlexStyle = this.parseFlex(this.vtsFlex);
  }

  parseFlex(flex: number | string | null): string | null {
    if (typeof flex === 'number') {
      return `${flex} ${flex} auto`;
    } else if (typeof flex === 'string') {
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  }

  generateClass(): object {
    const listOfSizeInputName: Array<keyof VtsColDirective> = [
      'vtsXXXs',
      'vtsXXs',
      'vtsXs',
      'vtsSm',
      'vtsMd',
      'vtsLg',
      'vtsXl'
    ];
    const listClassMap: NgClassInterface = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('vts', '').toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === 'number' || typeof this[name] === 'string') {
          listClassMap[`vts-col-${sizeName}-${this[name]}`] = true;
        } else {
          const embedded = this[name] as EmbeddedProperty;
          const prefixArray: Array<keyof EmbeddedProperty> = [
            'span',
            'pull',
            'push',
            'offset',
            'order'
          ];
          prefixArray.forEach(prefix => {
            const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
            listClassMap[`vts-col-${sizeName}${prefixClass}${embedded[prefix]}`] =
              embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listClassMap;
  }

  constructor(
    private elementRef: ElementRef,
    @Optional() @Host() public vtsRowDirective: VtsRowDirective,
    public renderer: Renderer2,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.setHostClassMap();
    });

    this.setHostClassMap();
    this.setHostFlexStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setHostClassMap();
    const { vtsFlex } = changes;
    if (vtsFlex) {
      this.setHostFlexStyle();
    }
  }

  ngAfterViewInit(): void {
    if (this.vtsRowDirective) {
      this.vtsRowDirective.actualGutter$
        .pipe(takeUntil(this.destroy$))
        .subscribe(([horizontalGutter, verticalGutter]) => {
          const renderGutter = (name: string, gutter: number | null) => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
              this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
            }
          };
          renderGutter('padding-left', horizontalGutter);
          renderGutter('padding-right', horizontalGutter);
          renderGutter('padding-top', verticalGutter);
          renderGutter('padding-bottom', verticalGutter);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
