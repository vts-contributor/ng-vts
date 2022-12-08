/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { VtsOptionGroupComponent } from './option-group.component';

@Component({
  selector: 'vts-option',
  exportAs: 'vtsOption',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class VtsOptionComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsHide: BooleanInput;
  static ngAcceptInputType_vtsCustomContent: BooleanInput;

  private destroy$ = new Subject<void>();
  changes = new Subject();
  groupLabel: string | TemplateRef<VtsSafeAny> | null = null;
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<VtsSafeAny>;
  @Input() vtsLabel: string | null = null;
  @Input() vtsValue: VtsSafeAny | null = null;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsHide = false;
  @Input() @InputBoolean() vtsCustomContent = false;

  constructor(@Optional() private vtsOptionGroupComponent: VtsOptionGroupComponent) {}

  ngOnInit(): void {
    if (this.vtsOptionGroupComponent) {
      this.vtsOptionGroupComponent.changes
        .pipe(startWith(true), takeUntil(this.destroy$))
        .subscribe(() => {
          this.groupLabel = this.vtsOptionGroupComponent.vtsLabel;
        });
    }
  }

  ngOnChanges(): void {
    this.changes.next();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
