/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
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
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsResizeObserver } from '@ui-vts/ng-vts/cdk/resize-observer';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, measureScrollbar } from '@ui-vts/ng-vts/core/util';
import { PaginationItemRenderContext, VtsPaginationComponent } from '@ui-vts/ng-vts/pagination';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { VtsTableDataService } from '../table-data.service';
import { VtsTableStyleService } from '../table-style.service';
import {
  VtsTableData,
  VtsTableLayout,
  VtsTablePaginationPosition,
  VtsTableQueryParams,
  VtsTableSize
} from '../table.types';
import { VtsTableInnerScrollComponent } from './table-inner-scroll.component';
import { VtsTableVirtualScrollDirective } from './table-virtual-scroll.directive';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'table';

@Component({
  selector: 'vts-table',
  exportAs: 'vtsTable',
  providers: [VtsTableStyleService, VtsTableDataService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-spin
      [vtsDelay]="vtsLoadingDelay"
      [vtsSpinning]="vtsLoading"
      [vtsIndicator]="vtsLoadingIndicator"
    >
      <ng-container *ngIf="vtsPaginationPosition === 'both' || vtsPaginationPosition === 'top'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
      <div
        #tableMainElement
        class="vts-table"
        [class.vts-table-rtl]="dir === 'rtl'"
        [class.vts-table-fixed-header]="vtsData.length && scrollY"
        [class.vts-table-fixed-column]="scrollX"
        [class.vts-table-has-fix-left]="hasFixLeft"
        [class.vts-table-has-fix-right]="hasFixRight"
        [class.vts-table-bordered]="vtsBordered"
        [class.vts-table-out-bordered]="vtsOuterBordered && !vtsBordered"
        [class.vts-table-lg]="vtsSize === 'lg'"
        [class.vts-table-sm]="vtsSize === 'sm'"
        [class.vts-table-stripe]="vtsStripe"
      >
        <vts-table-title-footer [title]="vtsTitle" *ngIf="vtsTitle"></vts-table-title-footer>
        <vts-table-inner-scroll
          *ngIf="scrollY || scrollX; else defaultTemplate"
          [data]="data"
          [scrollX]="scrollX"
          [scrollY]="scrollY"
          [contentTemplate]="contentTemplate"
          [listOfColWidth]="listOfAutoColWidth"
          [theadTemplate]="theadTemplate"
          [verticalScrollBarWidth]="verticalScrollBarWidth"
          [virtualTemplate]="
            vtsVirtualScrollDirective ? vtsVirtualScrollDirective.templateRef : null
          "
          [virtualItemSize]="vtsVirtualItemSize"
          [virtualMaxBufferPx]="vtsVirtualMaxBufferPx"
          [virtualMinBufferPx]="vtsVirtualMinBufferPx"
          [tableMainElement]="tableMainElement"
          [virtualForTrackBy]="vtsVirtualForTrackBy"
        ></vts-table-inner-scroll>
        <ng-template #defaultTemplate>
          <vts-table-inner-default
            [tableLayout]="vtsTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></vts-table-inner-default>
        </ng-template>
        <vts-table-title-footer [footer]="vtsFooter" *ngIf="vtsFooter"></vts-table-title-footer>
      </div>
      <ng-container *ngIf="vtsPaginationPosition === 'both' || vtsPaginationPosition === 'bottom'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
    </vts-spin>
    <ng-template #paginationTemplate>
      <vts-pagination
        *ngIf="vtsShowPagination && data.length"
        [hidden]="!showPagination"
        class="vts-table-pagination vts-table-pagination-right"
        [vtsShowSizeChanger]="vtsShowSizeChanger"
        [vtsPageSizeOptions]="vtsPageSizeOptions"
        [vtsItemRender]="vtsItemRender!"
        [vtsShowQuickJumper]="vtsShowQuickJumper"
        [vtsHidePaginationOnSinglePage]="vtsHidePaginationOnSinglePage"
        [vtsShowTotal]="vtsShowTotal"
        [vtsPageSize]="vtsPageSize"
        [vtsTotal]="vtsTotal"
        [vtsSimple]="vtsSimple"
        [vtsMini]="vtsMini"
        [vtsResponsive]="vtsResponsive"
        [vtsRounded]="vtsRounded"
        [vtsOutline]="vtsOutline"
        [vtsPageIndex]="vtsPageIndex"
        (vtsPageSizeChange)="onPageSizeChange($event)"
        (vtsPageIndexChange)="onPageIndexChange($event)"
      ></vts-pagination>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.vts-table-wrapper-rtl]': 'dir === "rtl"'
  }
})
export class VtsTableComponent<T = VtsSafeAny>
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsClientPagination: BooleanInput;
  static ngAcceptInputType_vtsTemplateMode: BooleanInput;
  static ngAcceptInputType_vtsShowPagination: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsBordered: BooleanInput;
  static ngAcceptInputType_vtsOuterBordered: BooleanInput;
  static ngAcceptInputType_vtsShowSizeChanger: BooleanInput;
  static ngAcceptInputType_vtsHidePaginationOnSinglePage: BooleanInput;
  static ngAcceptInputType_vtsShowQuickJumper: BooleanInput;
  static ngAcceptInputType_vtsSimple: BooleanInput;
  static ngAcceptInputType_vtsMini: BooleanInput;
  static ngAcceptInputType_vtsOutline: BooleanInput;
  static ngAcceptInputType_vtsRounded: BooleanInput;
  static ngAcceptInputType_vtsResponsive: BooleanInput;
  static ngAcceptInputType_vtsStripe: BooleanInput;

  @Input() vtsTableLayout: VtsTableLayout = 'auto';
  @Input() vtsShowTotal: TemplateRef<{
    $implicit: number;
    range: [number, number];
  }> | null = null;
  @Input()
  @Input()
  vtsItemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() vtsTitle: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsFooter: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsNoResult: string | TemplateRef<VtsSafeAny> | undefined = undefined;
  @Input() vtsPageSizeOptions = [10, 20, 30, 40];
  @Input() vtsVirtualItemSize = 0;
  @Input() vtsVirtualMaxBufferPx = 200;
  @Input() vtsVirtualMinBufferPx = 100;
  @Input() vtsVirtualForTrackBy: TrackByFunction<VtsTableData> = index => index;
  @Input() vtsLoadingDelay = 0;
  @Input() vtsPageIndex = 1;
  @Input() vtsPageSize = 10;
  @Input() vtsTotal = 0;
  @Input() vtsWidthConfig: ReadonlyArray<string | null> = [];
  @Input() vtsData: ReadonlyArray<T> = [];
  @Input() vtsPaginationPosition: VtsTablePaginationPosition = 'bottom';
  @Input() vtsScroll: { x?: string | null; y?: string | null } = {
    x: null,
    y: null
  };
  @Input() @InputBoolean() vtsClientPagination = true;
  @Input() @InputBoolean() vtsTemplateMode = false;
  @Input() @InputBoolean() vtsShowPagination = false;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @InputBoolean() vtsOuterBordered = false;
  @Input() vtsLoadingIndicator: TemplateRef<VtsSafeAny> | null = null;
  @Input() @WithConfig() @InputBoolean() vtsBordered: boolean = true;
  @Input() @WithConfig() vtsSize: VtsTableSize = 'sm';
  @Input() @WithConfig() @InputBoolean() vtsShowSizeChanger: boolean = false;
  @Input() @WithConfig() @InputBoolean() vtsHidePaginationOnSinglePage: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsShowQuickJumper: boolean = false;
  @Input() @WithConfig() @InputBoolean() vtsSimple: boolean = false;
  @Input() @InputBoolean() vtsMini: boolean = false;
  @Input() @InputBoolean() vtsResponsive: boolean = false;
  @Input() @InputBoolean() vtsRounded: boolean = false;
  @Input() @InputBoolean() vtsOutline: boolean = false;
  @Input() @InputBoolean() vtsStripe: boolean = true;
  @Output() readonly vtsPageSizeChange = new EventEmitter<number>();
  @Output() readonly vtsPageIndexChange = new EventEmitter<number>();
  @Output() readonly vtsQueryParams = new EventEmitter<VtsTableQueryParams>();
  @Output() readonly vtsCurrentPageDataChange = new EventEmitter<ReadonlyArray<VtsTableData>>();

  @ViewChild(VtsPaginationComponent) pagination?: VtsPaginationComponent;

  /** public data for ngFor tr */
  public data: ReadonlyArray<T> = [];
  public cdkVirtualScrollViewport?: CdkVirtualScrollViewport;
  scrollX: string | null = null;
  scrollY: string | null = null;
  theadTemplate: TemplateRef<VtsSafeAny> | null = null;
  listOfAutoColWidth: ReadonlyArray<string | null> = [];
  listOfManualColWidth: ReadonlyArray<string | null> = [];
  hasFixLeft = false;
  hasFixRight = false;
  showPagination = true;
  private destroy$ = new Subject<void>();
  private loading$ = new BehaviorSubject<boolean>(false);
  private templateMode$ = new BehaviorSubject<boolean>(false);
  dir: Direction = 'ltr';
  @ContentChild(VtsTableVirtualScrollDirective, { static: false })
  vtsVirtualScrollDirective!: VtsTableVirtualScrollDirective;
  @ViewChild(VtsTableInnerScrollComponent)
  vtsTableInnerScrollComponent!: VtsTableInnerScrollComponent;
  verticalScrollBarWidth = 0;
  onPageSizeChange(size: number): void {
    this.vtsTableDataService.updatePageSize(size);
  }

  onPageIndexChange(index: number): void {
    this.vtsTableDataService.updatePageIndex(index);
  }

  constructor(
    private elementRef: ElementRef,
    private vtsResizeObserver: VtsResizeObserver,
    private vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private vtsTableStyleService: VtsTableStyleService,
    private vtsTableDataService: VtsTableDataService,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-table-wrapper');
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    const { pageIndexDistinct$, pageSizeDistinct$, listOfCurrentPageData$, total$, queryParams$ } =
      this.vtsTableDataService;
    const { theadTemplate$, hasFixLeft$, hasFixRight$ } = this.vtsTableStyleService;

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    queryParams$.pipe(takeUntil(this.destroy$)).subscribe(this.vtsQueryParams);
    pageIndexDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageIndex => {
      if (pageIndex !== this.vtsPageIndex) {
        this.vtsPageIndex = pageIndex;
        this.vtsPageIndexChange.next(pageIndex);
      }
    });
    pageSizeDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
      if (pageSize !== this.vtsPageSize) {
        this.vtsPageSize = pageSize;
        this.vtsPageSizeChange.next(pageSize);
      }
    });
    total$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.vtsClientPagination)
      )
      .subscribe(total => {
        if (total !== this.vtsTotal) {
          this.vtsTotal = total;
          this.cdr.markForCheck();
        }
      });
    listOfCurrentPageData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.data = data;
      this.vtsCurrentPageDataChange.next(data);
      this.cdr.markForCheck();
    });

    theadTemplate$.pipe(takeUntil(this.destroy$)).subscribe(theadTemplate => {
      this.theadTemplate = theadTemplate;
      this.cdr.markForCheck();
    });

    hasFixLeft$.pipe(takeUntil(this.destroy$)).subscribe(hasFixLeft => {
      this.hasFixLeft = hasFixLeft;
      this.cdr.markForCheck();
    });

    hasFixRight$.pipe(takeUntil(this.destroy$)).subscribe(hasFixRight => {
      this.hasFixRight = hasFixRight;
      this.cdr.markForCheck();
    });

    combineLatest([total$, this.loading$, this.templateMode$])
      .pipe(
        map(([total, loading, templateMode]) => total === 0 && !loading && !templateMode),
        takeUntil(this.destroy$)
      )
      .subscribe(empty => {
        this.vtsTableStyleService.setShowEmpty(empty);
      });

    this.verticalScrollBarWidth = measureScrollbar('vertical');
    this.vtsTableStyleService.listOfListOfThWidthPx$
      .pipe(takeUntil(this.destroy$))
      .subscribe(listOfWidth => {
        this.listOfAutoColWidth = listOfWidth;
        this.cdr.markForCheck();
      });
    this.vtsTableStyleService.manualWidthConfigPx$
      .pipe(takeUntil(this.destroy$))
      .subscribe(listOfWidth => {
        this.listOfManualColWidth = listOfWidth;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      vtsScroll,
      vtsPageIndex,
      vtsPageSize,
      vtsClientPagination,
      vtsData,
      vtsWidthConfig,
      vtsNoResult,
      vtsLoading,
      vtsTemplateMode
    } = changes;
    if (vtsPageIndex) {
      this.vtsTableDataService.updatePageIndex(this.vtsPageIndex);
    }
    if (vtsPageSize) {
      this.vtsTableDataService.updatePageSize(this.vtsPageSize);
    }
    if (vtsData) {
      this.vtsData = this.vtsData || [];
      this.vtsTableDataService.updateListOfData(this.vtsData);
    }
    if (vtsClientPagination) {
      this.vtsTableDataService.updateFrontPagination(this.vtsClientPagination);
    }
    if (vtsScroll) {
      this.setScrollOnChanges();
    }
    if (vtsWidthConfig) {
      this.vtsTableStyleService.setTableWidthConfig(this.vtsWidthConfig);
    }
    if (vtsLoading) {
      this.loading$.next(this.vtsLoading);
    }
    if (vtsTemplateMode) {
      this.templateMode$.next(this.vtsTemplateMode);
    }
    if (vtsNoResult) {
      this.vtsTableStyleService.setNoResult(this.vtsNoResult);
    }

    this.updateShowPagination();
  }

  ngAfterViewInit(): void {
    this.vtsResizeObserver
      .observe(this.elementRef)
      .pipe(
        map(([entry]) => {
          const { width } = entry.target.getBoundingClientRect();
          const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
          return Math.floor(width - scrollBarWidth);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(this.vtsTableStyleService.hostWidth$);
    if (
      this.vtsTableInnerScrollComponent &&
      this.vtsTableInnerScrollComponent.cdkVirtualScrollViewport
    ) {
      this.cdkVirtualScrollViewport = this.vtsTableInnerScrollComponent.cdkVirtualScrollViewport;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setScrollOnChanges(): void {
    this.scrollX = (this.vtsScroll && this.vtsScroll.x) || null;
    this.scrollY = (this.vtsScroll && this.vtsScroll.y) || null;
    this.vtsTableStyleService.setScroll(this.scrollX, this.scrollY);
  }

  private updateShowPagination(): void {
    this.showPagination =
      (this.vtsHidePaginationOnSinglePage && this.vtsData.length > this.vtsPageSize) ||
      (this.vtsData.length > 0 && !this.vtsHidePaginationOnSinglePage) ||
      (!this.vtsClientPagination && this.vtsTotal > this.vtsPageSize);
  }
}
