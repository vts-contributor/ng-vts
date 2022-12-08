/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsStatisticValueType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'vts-statistic-number',
  exportAs: 'vtsStatisticNumber',
  template: `
    <span class="vts-statistic-content-value">
      <ng-container
        *ngIf="vtsValueTemplate"
        [ngTemplateOutlet]="vtsValueTemplate"
        [ngTemplateOutletContext]="{ $implicit: vtsValue }"
      ></ng-container>
      <ng-container *ngIf="!vtsValueTemplate">
        <span *ngIf="displayInt" class="vts-statistic-content-value-int">
          {{ displayInt }}
        </span>
        <span *ngIf="displayDecimal" class="vts-statistic-content-value-decimal">
          {{ displayDecimal }}
        </span>
      </ng-container>
    </span>
  `
})
export class VtsStatisticNumberComponent implements OnChanges {
  @Input() vtsValue?: VtsStatisticValueType;
  @Input() vtsValueTemplate?: TemplateRef<{ $implicit: VtsStatisticValueType }>;

  displayInt = '';
  displayDecimal = '';

  constructor(@Inject(LOCALE_ID) private locale_id: string) {}

  ngOnChanges(): void {
    this.formatNumber();
  }

  private formatNumber(): void {
    const decimalSeparator: string =
      typeof this.vtsValue === 'number'
        ? '.'
        : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
    const value = String(this.vtsValue);
    const [int, decimal] = value.split(decimalSeparator);

    this.displayInt = int;
    this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : '';
  }
}
