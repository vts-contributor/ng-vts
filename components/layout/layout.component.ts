/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsSiderComponent } from './sider.component';

@Component({
  selector: 'vts-layout',
  exportAs: 'vtsLayout',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-layout-rtl]': `dir === 'rtl'`,
    '[class.vts-layout-has-sider]': 'listOfVtsSiderComponent.length > 0'
  }
})
export class VtsLayoutComponent implements OnDestroy, OnInit {
  @ContentChildren(VtsSiderComponent)
  listOfVtsSiderComponent!: QueryList<VtsSiderComponent>;

  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-layout');
  }
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
