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
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NgStyleInterface, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, toArray } from '@ui-vts/ng-vts/core/util';
import { VtsI18nService, VtsTransferI18nInterface } from '@ui-vts/ng-vts/i18n';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  TransferCanMove,
  TransferChange,
  TransferDirection,
  TransferItem,
  TransferSearchChange,
  TransferSelectChange
} from './interface';
import { VtsTransferListComponent } from './transfer-list.component';

@Component({
  selector: 'vts-transfer',
  exportAs: 'vtsTransfer',
  preserveWhitespaces: false,
  template: `
    <vts-transfer-list
      class="vts-transfer-list"
      [ngStyle]="vtsListStyle"
      data-direction="left"
      direction="left"
      [titleText]="vtsTitles[0]"
      [showSelectAll]="vtsShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="vtsCustomFilterFn"
      (filterChange)="handleFilterChange($event)"
      [renderList]="vtsRenderList && vtsRenderList[0]"
      [render]="vtsRender"
      [disabled]="vtsDisabled"
      [showSearch]="vtsShowSearch"
      [searchPlaceholder]="vtsSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="vtsNoResult"
      [itemUnit]="vtsItemUnit || locale?.itemUnit"
      [itemsUnit]="vtsItemsUnit || locale?.itemsUnit"
      [footer]="vtsFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    ></vts-transfer-list>
    <div *ngIf="dir !== 'rtl'" class="vts-transfer-operation">
      <button
        vts-button
        (click)="moveToLeft()"
        [disabled]="vtsDisabled || !leftActive"
        [vtsType]="'primary'"
        [vtsSize]="'sm'"
      >
        <i vts-icon vtsType="ChevronLeft"></i>
        <span *ngIf="vtsOperations[1]">{{ vtsOperations[1] }}</span>
      </button>
      <button
        vts-button
        (click)="moveToRight()"
        [disabled]="vtsDisabled || !rightActive"
        [vtsType]="'primary'"
        [vtsSize]="'sm'"
      >
        <i vts-icon vtsType="ChevronRight"></i>
        <span *ngIf="vtsOperations[0]">{{ vtsOperations[0] }}</span>
      </button>
    </div>
    <div *ngIf="dir === 'rtl'" class="vts-transfer-operation">
      <button
        vts-button
        (click)="moveToRight()"
        [disabled]="vtsDisabled || !rightActive"
        [vtsType]="'primary'"
        [vtsSize]="'sm'"
      >
        <i vts-icon vtsType="ChevronLeft"></i>
        <span *ngIf="vtsOperations[0]">{{ vtsOperations[0] }}</span>
      </button>
      <button
        vts-button
        (click)="moveToLeft()"
        [disabled]="vtsDisabled || !leftActive"
        [vtsType]="'primary'"
        [vtsSize]="'sm'"
      >
        <i vts-icon vtsType="ChevronRight"></i>
        <span *ngIf="vtsOperations[1]">{{ vtsOperations[1] }}</span>
      </button>
    </div>
    <vts-transfer-list
      class="vts-transfer-list"
      [ngStyle]="vtsListStyle"
      data-direction="right"
      direction="right"
      [titleText]="vtsTitles[1]"
      [showSelectAll]="vtsShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="vtsCustomFilterFn"
      (filterChange)="handleFilterChange($event)"
      [renderList]="vtsRenderList && vtsRenderList[1]"
      [render]="vtsRender"
      [disabled]="vtsDisabled"
      [showSearch]="vtsShowSearch"
      [searchPlaceholder]="vtsSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="vtsNoResult"
      [itemUnit]="vtsItemUnit || locale?.itemUnit"
      [itemsUnit]="vtsItemsUnit || locale?.itemsUnit"
      [footer]="vtsFooter"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    ></vts-transfer-list>
  `,
  host: {
    '[class.vts-transfer-rtl]': `dir === 'rtl'`,
    '[class.vts-transfer-disabled]': `vtsDisabled`,
    '[class.vts-transfer-customize-list]': `vtsRenderList`
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsTransferComponent implements OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsShowSelectAll: BooleanInput;
  static ngAcceptInputType_vtsShowSearch: BooleanInput;

  private unsubscribe$ = new Subject<void>();

  @ViewChildren(VtsTransferListComponent)
  lists!: QueryList<VtsTransferListComponent>;
  locale!: VtsTransferI18nInterface;

  leftFilter = '';
  rightFilter = '';
  dir: Direction = 'ltr';

  // #region fields

  @Input() @InputBoolean() vtsDisabled = false;
  @Input() vtsDataSource: TransferItem[] = [];
  @Input() vtsTitles: string[] = ['', ''];
  @Input() vtsOperations: string[] = [];
  @Input() vtsListStyle: NgStyleInterface = {};
  @Input() @InputBoolean() vtsShowSelectAll = true;
  @Input() vtsItemUnit?: string;
  @Input() vtsItemsUnit?: string;
  @Input() vtsCanMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (
    arg: TransferCanMove
  ) => of(arg.list);
  @Input() vtsRenderList: Array<TemplateRef<VtsSafeAny> | null> | null = null;
  @Input() vtsRender: TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsFooter: TemplateRef<VtsSafeAny> | null = null;
  @Input() @InputBoolean() vtsShowSearch = false;
  @Input() vtsCustomFilterFn?: (inputValue: string, item: TransferItem) => boolean;
  @Input() vtsSearchPlaceholder?: string;
  @Input() vtsNoResult?: string;
  @Input() vtsTargetKeys: string[] = [];
  @Input() vtsSelectedKeys: string[] = [];

  // events
  @Output() readonly vtsChange = new EventEmitter<TransferChange>();
  @Output() readonly vtsSearchChange = new EventEmitter<TransferSearchChange>();
  @Output() readonly vtsSelectChange = new EventEmitter<TransferSelectChange>();

  // #endregion

  // #region process data

  // left
  leftDataSource: TransferItem[] = [];

  // right
  rightDataSource: TransferItem[] = [];

  private splitDataSource(): void {
    this.leftDataSource = [];
    this.rightDataSource = [];
    this.vtsDataSource.forEach(record => {
      if (record.direction === 'right') {
        record.direction = 'right';
        this.rightDataSource.push(record);
      } else {
        record.direction = 'left';
        this.leftDataSource.push(record);
      }
    });
  }

  private getCheckedData(direction: TransferDirection): TransferItem[] {
    return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
  }

  handleLeftSelectAll = (checked: boolean) => this.handleSelect('left', checked);
  handleRightSelectAll = (checked: boolean) => this.handleSelect('right', checked);

  handleLeftSelect = (item: TransferItem) => this.handleSelect('left', !!item.checked, item);
  handleRightSelect = (item: TransferItem) => this.handleSelect('right', !!item.checked, item);

  handleSelect(direction: TransferDirection, checked: boolean, item?: TransferItem): void {
    const list = this.getCheckedData(direction);
    this.updateOperationStatus(direction, list.length);
    this.vtsSelectChange.emit({ direction, checked, list, item });
  }

  handleFilterChange(ret: { direction: TransferDirection; value: string }): void {
    this.vtsSearchChange.emit(ret);
  }

  // #endregion

  // #region operation

  leftActive = false;
  rightActive = false;

  private updateOperationStatus(direction: TransferDirection, count?: number): void {
    this[direction === 'right' ? 'leftActive' : 'rightActive'] =
      (typeof count === 'undefined'
        ? this.getCheckedData(direction).filter(w => !w.disabled).length
        : count) > 0;
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  moveTo(direction: TransferDirection): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    this.updateOperationStatus(oppositeDirection, 0);
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const moveList = datasource.filter(item => item.checked === true && !item.disabled);
    this.vtsCanMove({ direction, list: moveList }).subscribe(
      newMoveList =>
        this.truthMoveTo(
          direction,
          newMoveList.filter(i => !!i)
        ),
      () => moveList.forEach(i => (i.checked = false))
    );
  }

  private truthMoveTo(direction: TransferDirection, list: TransferItem[]): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
    for (const item of list) {
      item.checked = false;
      item.hide = false;
      item.direction = direction;
      datasource.splice(datasource.indexOf(item), 1);
    }
    targetDatasource.splice(0, 0, ...list);
    this.updateOperationStatus(oppositeDirection);
    this.vtsChange.emit({
      from: oppositeDirection,
      to: direction,
      list
    });
    this.markForCheckAllList();
  }

  // #endregion

  constructor(
    private cdr: ChangeDetectorRef,
    private i18n: VtsI18nService,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-transfer');
  }

  private markForCheckAllList(): void {
    if (!this.lists) {
      return;
    }
    this.lists.forEach(i => i.markForCheck());
  }

  private handleVtsTargetKeys(): void {
    const keys = toArray(this.vtsTargetKeys);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');
    this.leftDataSource.forEach(e => {
      if (hasOwnKey(e) && keys.indexOf(e.key) !== -1 && !e.disabled) {
        e.checked = true;
      }
    });
    this.moveToRight();
  }

  private handleVtsSelectedKeys(): void {
    const keys = toArray(this.vtsSelectedKeys);
    this.vtsDataSource.forEach(e => {
      if (keys.indexOf(e.key) !== -1) {
        e.checked = true;
      }
    });
    const term = (ld: TransferItem) => ld.disabled === false && ld.checked === true;
    this.rightActive = this.leftDataSource.some(term);
    this.leftActive = this.rightDataSource.some(term);
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Transfer');
      this.markForCheckAllList();
    });

    this.dir = this.directionality.value;
    this.directionality.change
      ?.pipe(takeUntil(this.unsubscribe$))
      .subscribe((direction: Direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsDataSource) {
      this.splitDataSource();
      this.updateOperationStatus('left');
      this.updateOperationStatus('right');
      this.cdr.detectChanges();
      this.markForCheckAllList();
    }
    if (changes.vtsTargetKeys) {
      this.handleVtsTargetKeys();
    }
    if (changes.vtsSelectedKeys) {
      this.handleVtsSelectedKeys();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
