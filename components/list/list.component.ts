/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  BooleanInput,
  VtsDirectionVHType,
  VtsSafeAny,
  VtsSizeXLMSType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsListGrid } from './interface';
import {
  VtsListFooterComponent,
  VtsListLoadMoreDirective,
  VtsListPaginationComponent
} from './list-cell';

@Component({
  selector: 'vts-list, [vts-list]',
  exportAs: 'vtsList',
  template: `
    <ng-template #itemsTpl>
      <div class="vts-list-items">
        <ng-container *ngFor="let item of vtsDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="vtsRenderItem"
            [ngTemplateOutletContext]="{
              $implicit: item,
              index: index
            }"
          ></ng-template>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>

    <vts-list-header *ngIf="vtsHeader">
      <ng-container *vtsStringTemplateOutlet="vtsHeader">
        {{ vtsHeader }}
      </ng-container>
    </vts-list-header>
    <ng-content select="vts-list-header"></ng-content>

    <vts-spin [vtsSpinning]="vtsLoading">
      <ng-container>
        <div
          *ngIf="vtsLoading && vtsDataSource && vtsDataSource.length === 0"
          [style.min-height.px]="53"
        ></div>
        <div
          *ngIf="vtsGrid && vtsDataSource; else itemsTpl"
          vts-row
          [vtsGutter]="vtsGrid.gutter || null"
        >
          <div
            vts-col
            [vtsSpan]="vtsGrid.span || null"
            [vtsXs]="vtsGrid.xs || null"
            [vtsSm]="vtsGrid.sm || null"
            [vtsMd]="vtsGrid.md || null"
            [vtsLg]="vtsGrid.lg || null"
            [vtsXl]="vtsGrid.xl || null"
            *ngFor="let item of vtsDataSource; let index = index"
          >
            <ng-template
              [ngTemplateOutlet]="vtsRenderItem"
              [ngTemplateOutletContext]="{
                $implicit: item,
                index: index
              }"
            ></ng-template>
          </div>
        </div>
        <vts-list-empty
          *ngIf="!vtsLoading && vtsDataSource && vtsDataSource.length === 0"
          [vtsNoResult]="vtsNoResult"
        ></vts-list-empty>
      </ng-container>
    </vts-spin>

    <vts-list-footer *ngIf="vtsFooter">
      <ng-container *vtsStringTemplateOutlet="vtsFooter">
        {{ vtsFooter }}
      </ng-container>
    </vts-list-footer>
    <ng-content select="vts-list-footer, [vts-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="vtsLoadMore"></ng-template>
    <ng-content select="vts-list-load-more, [vts-list-load-more]"></ng-content>

    <vts-list-pagination *ngIf="vtsPagination">
      <ng-template [ngTemplateOutlet]="vtsPagination"></ng-template>
    </vts-list-pagination>
    <ng-content select="vts-list-pagination, [vts-list-pagination]"></ng-content>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-list-rtl]': `dir === 'rtl'`,
    '[class.vts-list-vertical]': 'vtsItemLayout === "vertical"',
    '[class.vts-list-lg]': 'vtsSize === "lg"',
    '[class.vts-list-sm]': 'vtsSize === "sm"',
    '[class.vts-list-split]': 'vtsSplit',
    '[class.vts-list-bordered]': 'vtsBordered',
    '[class.vts-list-loading]': 'vtsLoading',
    '[class.vts-list-something-after-last-item]': 'hasSomethingAfterLastItem'
  }
})
export class VtsListComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  static ngAcceptInputType_vtsBordered: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsSplit: BooleanInput;
  static ngAcceptInputType_vtsGrid: '' | VtsListGrid | null | undefined;

  @Input() vtsDataSource?: VtsSafeAny[];
  @Input() @InputBoolean() vtsBordered = false;
  @Input() vtsGrid?: VtsListGrid | '' = '';
  @Input() vtsHeader?: string | TemplateRef<void>;
  @Input() vtsFooter?: string | TemplateRef<void>;
  @Input() vtsItemLayout: VtsDirectionVHType = 'horizontal';
  @Input() vtsRenderItem: TemplateRef<void> | null = null;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() vtsLoadMore: TemplateRef<void> | null = null;
  @Input() vtsPagination?: TemplateRef<void>;
  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input() @InputBoolean() vtsSplit = true;
  @Input() vtsNoResult?: string | TemplateRef<void>;

  @ContentChild(VtsListFooterComponent)
  vtsListFooterComponent!: VtsListFooterComponent;
  @ContentChild(VtsListPaginationComponent)
  vtsListPaginationComponent!: VtsListPaginationComponent;
  @ContentChild(VtsListLoadMoreDirective)
  vtsListLoadMoreDirective!: VtsListLoadMoreDirective;

  hasSomethingAfterLastItem = false;
  dir: Direction = 'ltr';
  private itemLayoutNotifySource = new BehaviorSubject<VtsDirectionVHType>(this.vtsItemLayout);
  private destroy$ = new Subject<void>();

  get itemLayoutNotify$(): Observable<VtsDirectionVHType> {
    return this.itemLayoutNotifySource.asObservable();
  }

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-list');
  }
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  getSomethingAfterLastItem(): boolean {
    return !!(
      this.vtsLoadMore ||
      this.vtsPagination ||
      this.vtsFooter ||
      this.vtsListFooterComponent ||
      this.vtsListPaginationComponent ||
      this.vtsListLoadMoreDirective
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsItemLayout) {
      this.itemLayoutNotifySource.next(this.vtsItemLayout);
    }
  }

  ngOnDestroy(): void {
    this.itemLayoutNotifySource.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
  }
}
