/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkTree, TreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { Subject } from 'rxjs';
import { BooleanInput, NumberInput, VtsSafeAny, VtsSizeLMSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';
import { takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

@Component({ template: '' })
//@ts-ignore
export class VtsTreeView<T, F> extends CdkTree<T> implements OnInit, OnDestroy, OnChanges {
  static ngAcceptInputType_vtsShowLine: BooleanInput;
  static ngAcceptInputType_vtsIndent: NumberInput;
  static ngAcceptInputType_vtsInitialIndent: NumberInput;

  private destroy$ = new Subject();
  dir: Direction = 'ltr';
  _dataSourceChanged = new Subject<void>();
  _reRenderNodes = new Subject<void>();
  @Input('vtsTreeControl') override treeControl!: TreeControl<T, VtsSafeAny>;
  @Input('vtsDataSource')
  override get dataSource(): DataSource<T> {
    return super.dataSource as DataSource<T>;
  }
  override set dataSource(dataSource: DataSource<T>) {
    super.dataSource = dataSource;
  }
  @Input() @InputNumber() vtsIndent: number = 24;
  @Input() @InputNumber() vtsInitialIndent: number = 8;
  @Input() @InputBoolean() vtsShowLine = false;
  @Input() vtsSize: VtsSizeLMSType = 'md';

  constructor(
    protected differs: IterableDiffers,
    protected changeDetectorRef: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective,
    @Optional() private directionality?: Directionality
  ) {
    super(differs, changeDetectorRef);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.directionality) {
      this.dir = this.directionality.value;
      this.directionality.change
        ?.pipe(takeUntil(this.destroy$))
        .subscribe((direction: Direction) => {
          this.dir = direction;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsShowLine } = changes;
    if (vtsShowLine) {
      this._reRenderNodes.next();
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  override renderNodeChanges(
    data: T[] | ReadonlyArray<T>,
    dataDiffer?: IterableDiffer<T>,
    viewContainer?: ViewContainerRef,
    parentData?: T
  ): void {
    super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
    this._dataSourceChanged.next();
  }
}
