/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { toNumber } from '@ui-vts/ng-vts/core/util';
import { VtsPaginationI18nInterface } from '@ui-vts/ng-vts/i18n';

@Component({
  selector: 'div[vts-pagination-options]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vts-select
      class="vts-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [vtsAllowClear]="false"
      [vtsDisabled]="disabled"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <vts-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [vtsLabel]="option.label"
        [vtsValue]="option.value"
      ></vts-option>
    </vts-select>
    <div class="vts-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `
})
export class VtsPaginationOptionsComponent implements OnChanges {
  @Input() disabled = false;
  @Input() showSizeChanger = false;
  @Input() showQuickJumper = false;
  @Input() locale!: VtsPaginationI18nInterface;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [];
  @Output() readonly pageIndexChange = new EventEmitter<number>();
  @Output() readonly pageSizeChange = new EventEmitter<number>();
  listOfPageSizeOption: Array<{ value: number; label: string }> = [];
  vtsSize = 'md';

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-pagination-options');
  }

  onPageSizeChange(size: number): void {
    if (this.pageSize !== size) {
      this.pageSizeChange.next(size);
    }
  }

  jumpToPageViaInput($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const index = Math.floor(toNumber(target.value, this.pageIndex));
    this.pageIndexChange.next(index);
    target.value = '';
  }

  trackByOption(_: number, option: { value: number; label: string }): number {
    return option.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { pageSize, pageSizeOptions, locale } = changes;
    if (pageSize || pageSizeOptions || locale) {
      this.listOfPageSizeOption = [...new Set([...this.pageSizeOptions, this.pageSize])].map(
        item => {
          return {
            value: item,
            label: `${item} ${this.locale.items_per_page}`
          };
        }
      );
    }
  }
}
