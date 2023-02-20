import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  VtsProTableFilterFn,
  VtsProTableFilterList,
  VtsProTableFilterValue,
  VtsProTableSortFn,
  VtsProTableSortOrder
} from '../protable.types';

@Component({
  selector:
    'th[vtsColumnKey], th[vtsSortFn], th[vtsSortOrder], th[vtsFilters], th[vtsShowSort], th[vtsShowFilter], th[vtsCustomFilter]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vts-protable-filter
      *ngIf="vtsShowFilter || vtsCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="vtsCustomFilter"
      [filterMultiple]="vtsFilterMultiple"
      [listOfFilter]="vtsFilters"
      (filterChange)="onFilterValueChange($event)"
    ></vts-protable-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="vtsShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[vts-th-extra]"></ng-content>
      <ng-content select="vts-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <vts-protable-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></vts-protable-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.vts-table-column-has-sorters]': 'vtsShowSort',
    '[class.vts-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`,
    '(click)': 'emitNextSortValue()'
  }
})
export class VtsThAddOnComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_vtsShowSort: BooleanInput;
  static ngAcceptInputType_vtsShowFilter: BooleanInput;
  static ngAcceptInputType_vtsCustomFilter: BooleanInput;

  manualClickOrder$ = new Subject<VtsThAddOnComponent>();
  calcOperatorChange$ = new Subject();
  vtsFilterValue: VtsProTableFilterValue = null;
  sortOrder: VtsProTableSortOrder = null;
  sortDirections: VtsProTableSortOrder[] = ['ascend', 'descend', null];
  private sortOrderChange$ = new Subject<VtsProTableSortOrder>();
  private destroy$ = new Subject();
  private isVtsShowSortChanged = false;
  private isVtsShowFilterChanged = false;
  @Input() vtsColumnKey?: string;
  @Input() vtsFilterMultiple = true;
  @Input() vtsSortOrder: VtsProTableSortOrder = null;
  @Input() vtsSortPriority: number | boolean = false;
  @Input() vtsSortDirections: VtsProTableSortOrder[] = ['ascend', 'descend', null];
  @Input() vtsFilters: VtsProTableFilterList = [];
  @Input() vtsSortFn: VtsProTableSortFn | boolean | null = null;
  @Input() vtsFilterFn: VtsProTableFilterFn | boolean | null = null;
  @Input() @InputBoolean() vtsShowSort = false;
  @Input() @InputBoolean() vtsShowFilter = false;
  @Input() @InputBoolean() vtsCustomFilter = false;
  @Output() readonly vtsCheckedChange = new EventEmitter<boolean>();
  @Output() readonly vtsSortOrderChange = new EventEmitter<string | null>();
  @Output() readonly vtsFilterChange = new EventEmitter<VtsProTableFilterValue>();

  getNextSortDirection(
    sortDirections: VtsProTableSortOrder[],
    current: VtsProTableSortOrder
  ): VtsProTableSortOrder {
    const index = sortDirections.indexOf(current);
    if (index === sortDirections.length - 1) {
      return sortDirections[0];
    } else {
      return sortDirections[index + 1];
    }
  }

  emitNextSortValue(): void {
    if (this.vtsShowSort) {
      const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder!);
      this.setSortOrder(nextOrder);
      this.manualClickOrder$.next(this);
    }
  }

  setSortOrder(order: VtsProTableSortOrder): void {
    this.sortOrderChange$.next(order);
  }

  clearSortOrder(): void {
    if (this.sortOrder !== null) {
      this.setSortOrder(null);
    }
  }

  onFilterValueChange(value: VtsProTableFilterValue): void {
    this.vtsFilterChange.emit(value);
    this.vtsFilterValue = value;
    this.updateCalcOperator();
  }

  updateCalcOperator(): void {
    this.calcOperatorChange$.next();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
      if (this.sortOrder !== order) {
        this.sortOrder = order;
        this.vtsSortOrderChange.emit(order);
      }
      this.updateCalcOperator();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      vtsSortDirections,
      vtsFilters,
      vtsSortOrder,
      vtsSortFn,
      vtsFilterFn,
      vtsSortPriority,
      vtsFilterMultiple,
      vtsShowSort,
      vtsShowFilter
    } = changes;
    if (vtsSortDirections) {
      if (this.vtsSortDirections && this.vtsSortDirections.length) {
        this.sortDirections = this.vtsSortDirections;
      }
    }
    if (vtsSortOrder) {
      this.sortOrder = this.vtsSortOrder;
      this.setSortOrder(this.vtsSortOrder);
    }
    if (vtsShowSort) {
      this.isVtsShowSortChanged = true;
    }
    if (vtsShowFilter) {
      this.isVtsShowFilterChanged = true;
    }
    const isFirstChange = (value: SimpleChange) =>
      value && value.firstChange && value.currentValue !== undefined;
    if ((isFirstChange(vtsSortOrder) || isFirstChange(vtsSortFn)) && !this.isVtsShowSortChanged) {
      this.vtsShowSort = true;
    }
    if (isFirstChange(vtsFilters) && !this.isVtsShowFilterChanged) {
      this.vtsShowFilter = true;
    }
    if ((vtsFilters || vtsFilterMultiple) && this.vtsShowFilter) {
      const listOfValue = this.vtsFilters.filter(item => item.byDefault).map(item => item.value);
      this.vtsFilterValue = this.vtsFilterMultiple ? listOfValue : listOfValue[0] || null;
    }
    if (vtsSortFn || vtsFilterFn || vtsSortPriority || vtsFilters) {
      this.updateCalcOperator();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
