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
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsButtonSize } from './button.component';

@Component({
  selector: 'vts-button-group',
  exportAs: 'vtsButtonGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vts-btn-group-xl]': `vtsSize === 'xl'`,
    '[class.vts-btn-group-lg]': `vtsSize === 'lg'`,
    '[class.vts-btn-group-mđ]': `vtsSize === 'md'`,
    '[class.vts-btn-group-sm]': `vtsSize === 'sm'`,
    '[class.vts-btn-group-xs]': `vtsSize === 'xs'`,
    '[class.vts-btn-group-rtl]': `dir === 'rtl'`
  },
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
  `
})
export class VtsButtonGroupComponent implements OnDestroy, OnInit {
  @Input() vtsSize: VtsButtonSize = 'md';

  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-btn-group');
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
