/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { accordionMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsMenuModeType } from './menu.types';

@Component({
  selector: '[vts-submenu-inline-child]',
  animations: [accordionMotion],
  exportAs: 'vtsSubmenuInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
  `,
  host: {
    '[class.vts-menu-rtl]': `dir === 'rtl'`,
    '[@accordionMotion]': 'expandState'
  }
})
export class VtsSubmenuInlineChildComponent implements OnDestroy, OnInit, OnChanges {
  @Input() templateOutlet: TemplateRef<VtsSafeAny> | null = null;
  @Input() menuClass: string = '';
  @Input() mode: VtsMenuModeType = 'vertical';
  @Input() vtsOpen = false;
  listOfCacheClassName: string[] = [];
  expandState = 'collapsed';
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-menu', 'vts-menu-inline', 'vts-menu-sub');
  }

  calcMotionState(): void {
    if (this.vtsOpen) {
      this.expandState = 'expanded';
    } else {
      this.expandState = 'collapsed';
    }
  }
  ngOnInit(): void {
    this.calcMotionState();

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { mode, vtsOpen, menuClass } = changes;
    if (mode || vtsOpen) {
      this.calcMotionState();
    }
    if (menuClass) {
      if (this.listOfCacheClassName.length) {
        this.listOfCacheClassName
          .filter(item => !!item)
          .forEach(className => {
            this.renderer.removeClass(this.elementRef.nativeElement, className);
          });
      }
      if (this.menuClass) {
        this.listOfCacheClassName = this.menuClass.split(' ');
        this.listOfCacheClassName
          .filter(item => !!item)
          .forEach(className => {
            this.renderer.addClass(this.elementRef.nativeElement, className);
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
