/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';

export type VtsFormControlStatusType = 'success' | 'error' | 'warning' | 'validating' | null;

/** should add vts-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector: 'vts-form-item',
  exportAs: 'vtsFormItem',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vts-form-item-has-success]': 'status === "success"',
    '[class.vts-form-item-has-warning]': 'status === "warning"',
    '[class.vts-form-item-has-error]': 'status === "error"',
    '[class.vts-form-item-is-validating]': 'status === "validating"',
    '[class.vts-form-item-has-feedback]': 'hasFeedback && status',
    '[class.vts-form-item-with-help]': 'withHelpClass'
  },
  template: `
    <ng-content></ng-content>
  `
})
export class VtsFormItemComponent implements OnDestroy, OnDestroy {
  status: VtsFormControlStatusType = null;
  hasFeedback = false;
  withHelpClass = false;

  private destroy$ = new Subject();

  setWithHelpViaTips(value: boolean): void {
    this.withHelpClass = value;
    this.cdr.markForCheck();
  }

  setStatus(status: VtsFormControlStatusType): void {
    this.status = status;
    this.cdr.markForCheck();
  }

  setHasFeedback(hasFeedback: boolean): void {
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
  }

  constructor(elementRef: ElementRef, renderer: Renderer2, private cdr: ChangeDetectorRef) {
    renderer.addClass(elementRef.nativeElement, 'vts-form-item');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
