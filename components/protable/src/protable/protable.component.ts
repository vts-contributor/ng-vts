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
import { PaginationItemRenderContext } from '@ui-vts/ng-vts/pagination';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { VtsProTableData, VtsProTableLayout, VtsProTablePaginationPosition, VtsProTablePaginationType, VtsProTableQueryParams, VtsProTableSize } from '../protable.types';
import { VtsProTableVirtualScrollDirective } from './protable-virtual-scroll.directive';
import { VtsProTableInnerScrollComponent } from './protable-inner-scroll.component';
import { VtsProTableStyleService } from '../protable-style.service';
import { VtsProTableDataService } from '../protable-data.service';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'protable';

@Component({
  selector: 'vts-protable',
  exportAs: 'vtsProTable',
  providers: [VtsProTableStyleService, VtsProTableDataService],
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
      <ng-container *ngIf="true">
        <ng-template [ngTemplateOutlet]="selectedInfo"></ng-template>
      </ng-container>
      <ng-template #selectedInfo>
        <div style="background: #FCE5EA; border: 0.5px solid #CB002B; border-radius: 10px;" class="vts-table-pagination">
          <span>
            <span style="color: #CB002B">1</span> items is selected <span style="color: #CB002B">| <a>Clear selected</a></span>
          </span>
        </div>
      </ng-template>
      <div
        #tableMainElement
        class="vts-table"
        [class.vts-protable-rtl]="dir === 'rtl'"
        [class.vts-protable-fixed-header]="vtsData.length && scrollY"
        [class.vts-protable-fixed-column]="scrollX"
        [class.vts-protable-has-fix-left]="hasFixLeft"
        [class.vts-protable-has-fix-right]="hasFixRight"
        [class.vts-protable-bordered]="vtsBordered"
        [class.vts-protable-out-bordered]="vtsOuterBordered && !vtsBordered"
        [class.vts-protable-middle]="vtsSize === 'middle'"
        [class.vts-protable-small]="vtsSize === 'small'"
      >
        <vts-protable-title-footer [title]="vtsTitle" *ngIf="vtsTitle"></vts-protable-title-footer>
        <vts-protable-inner-scroll
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
        ></vts-protable-inner-scroll>
        <ng-template #defaultTemplate>
          <vts-protable-inner-default
            [tableLayout]="vtsTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></vts-protable-inner-default>
        </ng-template>
        <vts-protable-title-footer [footer]="vtsFooter" *ngIf="vtsFooter"></vts-protable-title-footer>
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
        [vtsSize]="vtsPaginationType === 'small' ? 'sm' : vtsSize === 'default' ? 'md' : 'sm'"
        [vtsPageSize]="vtsPageSize"
        [vtsTotal]="vtsTotal"
        [vtsSimple]="vtsSimple"
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
export class VtsProTableComponent<T = VtsSafeAny>
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
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

  @Input() vtsTableLayout: VtsProTableLayout = 'auto';
  @Input() vtsShowTotal: TemplateRef<{
    $implicit: number;
    range: [number, number];
  }> | null = null;
  @Input()
  vtsItemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() vtsTitle: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsFooter: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsNoResult: string | TemplateRef<VtsSafeAny> | undefined = undefined;
  @Input() vtsPageSizeOptions = [10, 20, 30, 40, 50];
  @Input() vtsVirtualItemSize = 0;
  @Input() vtsVirtualMaxBufferPx = 200;
  @Input() vtsVirtualMinBufferPx = 100;
  @Input() vtsVirtualForTrackBy: TrackByFunction<VtsProTableData> = index => index;
  @Input() vtsLoadingDelay = 0;
  @Input() vtsPageIndex = 1;
  @Input() vtsPageSize = 10;
  @Input() vtsTotal = 0;
  @Input() vtsWidthConfig: ReadonlyArray<string | null> = [];
  @Input() vtsData: ReadonlyArray<T> = [];
  @Input() vtsPaginationPosition: VtsProTablePaginationPosition = 'bottom';
  @Input() vtsScroll: { x?: string | null; y?: string | null } = {
    x: null,
    y: null
  };
  @Input() vtsPaginationType: VtsProTablePaginationType = 'default';
  @Input() @InputBoolean() vtsClientPagination = true;
  @Input() @InputBoolean() vtsTemplateMode = false;
  @Input() @InputBoolean() vtsShowPagination = false;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @InputBoolean() vtsOuterBordered = false;
  @Input()
  // @WithConfig()
  vtsLoadingIndicator: TemplateRef<VtsSafeAny> | null = null;
  @Input() @WithConfig() @InputBoolean() vtsBordered: boolean = true;
  @Input() @WithConfig() vtsSize: VtsProTableSize = 'default';
  @Input() @WithConfig() @InputBoolean() vtsShowSizeChanger: boolean = false;
  @Input() @WithConfig() @InputBoolean() vtsHidePaginationOnSinglePage: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsShowQuickJumper: boolean = false;
  @Input() @WithConfig() @InputBoolean() vtsSimple: boolean = false;
  @Output() readonly vtsPageSizeChange = new EventEmitter<number>();
  @Output() readonly vtsPageIndexChange = new EventEmitter<number>();
  @Output() readonly vtsQueryParams = new EventEmitter<VtsProTableQueryParams>();
  @Output() readonly vtsCurrentPageDataChange = new EventEmitter<ReadonlyArray<VtsProTableData>>();

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
  @ContentChild(VtsProTableVirtualScrollDirective, { static: false })
  vtsVirtualScrollDirective!: VtsProTableVirtualScrollDirective;
  @ViewChild(VtsProTableInnerScrollComponent)
  vtsTableInnerScrollComponent!: VtsProTableInnerScrollComponent;
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
    private vtsTableStyleService: VtsProTableStyleService,
    private vtsTableDataService: VtsProTableDataService,
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