/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { ThemeType } from '@ui-vts/icons-angular';
import { BooleanInput, VtsTSType } from '@ui-vts/ng-vts/core/types';

import { InputBoolean, toBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DefaultTooltipIcon, VtsFormDirective } from './form.directive';

export interface VtsFormTooltipIcon {
  type: VtsTSType;
  theme: ThemeType;
}

function toTooltipIcon(value: string | VtsFormTooltipIcon): Required<VtsFormTooltipIcon> {
  const icon = typeof value === 'string' ? { type: value } : value;
  return { ...DefaultTooltipIcon, ...icon };
}

@Component({
  selector: 'vts-form-label',
  exportAs: 'vtsFormLabel',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [attr.for]="vtsFor"
      [class.vts-form-item-no-colon]="vtsNoColon"
      [class.vts-form-item-required]="vtsRequired"
    >
      <ng-content></ng-content>
      <span
        *ngIf="vtsTooltipTitle"
        class="vts-form-item-tooltip"
        vts-tooltip
        [vtsTooltipTitle]="vtsTooltipTitle"
      >
        <ng-container *vtsStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
          <i vts-icon [vtsType]="tooltipIconType"></i>
        </ng-container>
      </span>
    </label>
  `
})
export class VtsFormLabelComponent implements OnDestroy {
  static ngAcceptInputType_vtsRequired: BooleanInput;
  static ngAcceptInputType_vtsNoColon: BooleanInput;

  @Input() vtsFor?: string;
  @Input() @InputBoolean() vtsRequired = false;
  @Input()
  set vtsNoColon(value: boolean) {
    this.noColon = toBoolean(value);
  }
  get vtsNoColon(): boolean {
    return this.noColon !== 'default' ? this.noColon : this.vtsFormDirective?.vtsNoColon;
  }

  private noColon: boolean | 'default' = 'default';

  @Input() vtsTooltipTitle?: VtsTSType;
  @Input()
  set vtsTooltipIcon(value: string | VtsFormTooltipIcon) {
    this._tooltipIcon = toTooltipIcon(value);
  }
  // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
  get tooltipIcon(): VtsFormTooltipIcon {
    return this._tooltipIcon !== 'default'
      ? this._tooltipIcon
      : toTooltipIcon(this.vtsFormDirective?.vtsTooltipIcon || DefaultTooltipIcon);
  }
  private _tooltipIcon: VtsFormTooltipIcon | 'default' = 'default';

  private destroy$ = new Subject();

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() @SkipSelf() private vtsFormDirective: VtsFormDirective
  ) {
    renderer.addClass(elementRef.nativeElement, 'vts-form-item-label');

    if (this.vtsFormDirective) {
      this.vtsFormDirective
        .getInputObservable('vtsNoColon')
        .pipe(
          filter(() => this.noColon === 'default'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.cdr.markForCheck());

      this.vtsFormDirective
        .getInputObservable('vtsTooltipIcon')
        .pipe(
          filter(() => this._tooltipIcon === 'default'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.cdr.markForCheck());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
