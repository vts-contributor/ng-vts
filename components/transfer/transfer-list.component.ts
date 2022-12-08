/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { TransferDirection, TransferItem } from './interface';

@Component({
  selector: 'vts-transfer-list',
  exportAs: 'vtsTransferList',
  preserveWhitespaces: false,
  template: `
    <ng-template #defaultRenderList>
      <ul *ngIf="stat.shownCount > 0" class="vts-transfer-list-content">
        <li
          *ngFor="let item of validData"
          (click)="onItemSelect(item)"
          class="vts-transfer-list-content-item"
          [ngClass]="{
            'vts-transfer-list-content-item-disabled': disabled || item.disabled
          }"
        >
          <label
            vts-checkbox
            [vtsChecked]="item.checked"
            (vtsCheckedChange)="onItemSelect(item)"
            (click)="$event.stopPropagation()"
            [vtsDisabled]="disabled || item.disabled"
          >
            <ng-container *ngIf="!render; else renderContainer">
              {{ item.title }}
            </ng-container>
            <ng-template
              #renderContainer
              [ngTemplateOutlet]="render"
              [ngTemplateOutletContext]="{ $implicit: item }"
            ></ng-template>
          </label>
        </li>
      </ul>
      <div *ngIf="stat.shownCount === 0" class="vts-transfer-list-body-not-found">
        <vts-embed-empty
          [vtsComponentName]="'transfer'"
          [specificContent]="notFoundContent"
        ></vts-embed-empty>
      </div>
    </ng-template>
    <div class="vts-transfer-list-header">
      <label
        *ngIf="showSelectAll"
        vts-checkbox
        [vtsChecked]="stat.checkAll"
        (vtsCheckedChange)="onItemSelectAll($event)"
        [vtsIndeterminate]="stat.checkHalf"
        [vtsDisabled]="stat.shownCount == 0 || disabled"
      ></label>
      <span class="vts-transfer-list-header-selected">
        <span>
          {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
        <span *ngIf="titleText" class="vts-transfer-list-header-title">
          {{ titleText }}
        </span>
      </span>
    </div>
    <div
      class="{{
        showSearch
          ? 'vts-transfer-list-body vts-transfer-list-body-with-search'
          : 'vts-transfer-list-body'
      }}"
      [ngClass]="{ 'vts-transfer__nodata': stat.shownCount === 0 }"
    >
      <div *ngIf="showSearch" class="vts-transfer-list-body-search-wrapper">
        <div
          vts-transfer-search
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [disabled]="disabled"
          [value]="filter"
        ></div>
      </div>
      <ng-container *ngIf="renderList; else defaultRenderList">
        <div class="vts-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      </ng-container>
    </div>
    <div *ngIf="footer" class="vts-transfer-list-footer">
      <ng-template
        [ngTemplateOutlet]="footer"
        [ngTemplateOutletContext]="{ $implicit: direction }"
      ></ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-transfer-list-with-footer]': '!!footer'
  }
})
export class VtsTransferListComponent {
  // #region fields

  @Input() direction: TransferDirection = 'left';
  @Input() titleText = '';
  @Input() showSelectAll = true;

  @Input() dataSource: TransferItem[] = [];

  @Input() itemUnit: string | undefined = '';
  @Input() itemsUnit: string | undefined = '';
  @Input() filter = '';
  @Input() disabled: boolean = false;
  @Input() showSearch?: boolean;
  @Input() searchPlaceholder?: string;
  @Input() notFoundContent?: string;
  @Input() filterOption?: (inputValue: string, item: TransferItem) => boolean;

  @Input() renderList: TemplateRef<void> | null = null;
  @Input() render: TemplateRef<void> | null = null;
  @Input() footer: TemplateRef<void> | null = null;

  // events
  @Output()
  readonly handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  readonly handleSelect: EventEmitter<TransferItem> = new EventEmitter();
  @Output() readonly filterChange: EventEmitter<{
    direction: TransferDirection;
    value: string;
  }> = new EventEmitter();

  stat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0
  };

  get validData(): TransferItem[] {
    return this.dataSource.filter(w => !w.hide);
  }

  onItemSelect = (item: TransferItem) => {
    if (this.disabled || item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.updateCheckStatus();
    this.handleSelect.emit(item);
  };

  onItemSelectAll = (status: boolean) => {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item.hide) {
        item.checked = status;
      }
    });

    this.updateCheckStatus();
    this.handleSelectAll.emit(status);
  };

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.validData.length;
    this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
    this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
  }

  // #endregion

  // #region search

  handleFilter(value: string): void {
    this.filter = value;
    this.dataSource.forEach(item => {
      item.hide = value.length > 0 && !this.matchFilter(value, item);
    });
    this.stat.shownCount = this.validData.length;
    this.filterChange.emit({ direction: this.direction, value });
  }

  handleClear(): void {
    this.handleFilter('');
  }

  private matchFilter(text: string, item: TransferItem): boolean {
    if (this.filterOption) {
      return this.filterOption(text, item);
    }
    return item.title.includes(text);
  }

  // #endregion

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-transfer-list');
  }

  markForCheck(): void {
    this.updateCheckStatus();
    this.cdr.markForCheck();
  }
}
