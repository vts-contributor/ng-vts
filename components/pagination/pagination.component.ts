/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { gridResponsiveMap, VtsBreakpointService } from '@ui-vts/ng-vts/core/services';
import { BooleanInput, NumberInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';
import { VtsI18nService, VtsPaginationI18nInterface } from '@ui-vts/ng-vts/i18n';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaginationItemRenderContext } from './pagination.types';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'pagination';

@Component({
  selector: 'vts-pagination',
  exportAs: 'vtsPagination',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="showPagination">
      <ng-container *ngIf="vtsSimple; else defaultPagination.template">
        <ng-template [ngTemplateOutlet]="simplePagination.template"></ng-template>
      </ng-container>
    </ng-container>
    <vts-pagination-simple
      #simplePagination
      [disabled]="vtsDisabled"
      [itemRender]="vtsItemRender"
      [locale]="locale"
      [pageSize]="vtsPageSize"
      [total]="vtsTotal"
      [pageIndex]="vtsPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></vts-pagination-simple>
    <vts-pagination-default
      #defaultPagination
      [itemRender]="vtsItemRender"
      [showTotal]="vtsShowTotal"
      [disabled]="vtsDisabled"
      [locale]="locale"
      [showSizeChanger]="vtsShowSizeChanger"
      [showQuickJumper]="vtsShowQuickJumper"
      [showShortJump]="vtsShowShortJump"
      [total]="vtsTotal"
      [pageIndex]="vtsPageIndex"
      [pageSize]="vtsPageSize"
      [pageSizeOptions]="vtsPageSizeOptions"
      [itemLimit]="vtsItemLimit"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    ></vts-pagination-default>
  `,
  host: {
    '[class.vts-pagination-outline]': 'vtsOutline',
    '[class.vts-pagination-rounded]': 'vtsRounded',
    '[class.vts-pagination-simple]': 'vtsSimple',
    '[class.vts-pagination-disabled]': 'vtsDisabled',
    '[class.mini]': `!vtsSimple && (miniByBp || vtsMini)`,
    '[class.vts-pagination-rtl]': `dir === 'rtl'`
  }
})
export class VtsPaginationComponent implements OnInit, OnDestroy, OnChanges {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsShowSizeChanger: BooleanInput;
  static ngAcceptInputType_vtsHidePaginationOnSinglePage: BooleanInput;
  static ngAcceptInputType_vtsShowQuickJumper: BooleanInput;
  static ngAcceptInputType_vtsShowShortJumper: BooleanInput;
  static ngAcceptInputType_vtsMini: BooleanInput;
  static ngAcceptInputType_vtsSimple: BooleanInput;
  static ngAcceptInputType_vtsResponsive: BooleanInput;
  static ngAcceptInputType_vtsTotal: NumberInput;
  static ngAcceptInputType_vtsPageIndex: NumberInput;
  static ngAcceptInputType_vtsPageSize: NumberInput;
  static ngAcceptInputType_vtsRounded: BooleanInput;
  static ngAcceptInputType_vtsOutline: BooleanInput;

  @Output()
  readonly vtsPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output()
  readonly vtsPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Input() vtsShowTotal: TemplateRef<{
    $implicit: number;
    range: [number, number];
  }> | null = null;
  @Input()
  vtsItemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() @WithConfig() vtsPageSizeOptions: number[] = [10, 20, 30, 40];
  @Input() @WithConfig() @InputBoolean() vtsShowSizeChanger = false;
  @Input() @WithConfig() @InputBoolean() vtsShowQuickJumper = false;
  @Input() @WithConfig() @InputBoolean() vtsSimple = false;
  @Input() @InputBoolean() vtsMini = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsResponsive = false;
  @Input() @InputBoolean() vtsHidePaginationOnSinglePage = false;
  @Input() @InputNumber() vtsTotal = 0;
  @Input() @InputNumber() vtsPageIndex = 1;
  @Input() @InputNumber() vtsPageSize = 10;
  @Input() @InputBoolean() vtsRounded = false;
  @Input() @InputBoolean() vtsOutline = false;
  vtsShowShortJump = false;
  @Input() vtsItemLimit: number = 5;

  showPagination = true;
  locale!: VtsPaginationI18nInterface;
  dir: Direction = 'ltr';
  miniByBp = false;

  private destroy$ = new Subject<void>();
  private total$ = new ReplaySubject<number>(1);

  validatePageIndex(value: number, lastIndex: number): number {
    if (value > lastIndex) {
      return lastIndex;
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }

  onPageIndexChange(index: number): void {
    const lastIndex = this.getLastIndex(this.vtsTotal, this.vtsPageSize);
    const validIndex = this.validatePageIndex(index, lastIndex);
    if (validIndex !== this.vtsPageIndex && !this.vtsDisabled) {
      this.vtsPageIndex = validIndex;
      this.vtsPageIndexChange.emit(this.vtsPageIndex);
    }
  }

  onPageSizeChange(size: number): void {
    this.vtsPageSize = size;
    this.vtsPageSizeChange.emit(size);
    const lastIndex = this.getLastIndex(this.vtsTotal, this.vtsPageSize);
    if (this.vtsPageIndex > lastIndex) {
      this.onPageIndexChange(lastIndex);
    }
  }

  onTotalChange(total: number): void {
    const lastIndex = this.getLastIndex(total, this.vtsPageSize);
    if (this.vtsPageIndex > lastIndex) {
      Promise.resolve().then(() => this.onPageIndexChange(lastIndex));
    }
  }

  getLastIndex(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize);
  }

  get index() {
    return this.vtsPageIndex;
  }

  get lastIndex() {
    return this.getLastIndex(this.vtsTotal, this.vtsPageSize);
  }

  get range() {
    return [
      (this.vtsPageIndex - 1) * this.vtsPageSize + 1,
      Math.min(this.vtsPageIndex * this.vtsPageSize, this.vtsTotal)
    ];
  }

  get total() {
    return this.vtsTotal;
  }

  constructor(
    private i18n: VtsI18nService,
    private cdr: ChangeDetectorRef,
    private breakpointService: VtsBreakpointService,
    protected vtsConfigService: VtsConfigService,
    @Optional() private directionality: Directionality,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-pagination');
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Pagination');
      this.cdr.markForCheck();
    });

    this.total$.pipe(takeUntil(this.destroy$)).subscribe(total => {
      this.onTotalChange(total);
    });

    this.breakpointService
      .subscribe(gridResponsiveMap, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(bp => {
        if (this.vtsResponsive) {
          this.miniByBp = !bp.sm;
          this.cdr.markForCheck();
        }
      });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsHidePaginationOnSinglePage, vtsTotal, vtsPageSize } = changes;
    if (vtsTotal) {
      this.total$.next(this.vtsTotal);
    }
    if (vtsHidePaginationOnSinglePage || vtsTotal || vtsPageSize) {
      this.showPagination =
        (this.vtsHidePaginationOnSinglePage && this.vtsTotal > this.vtsPageSize) ||
        (this.vtsTotal > 0 && !this.vtsHidePaginationOnSinglePage);
    }
  }
}
