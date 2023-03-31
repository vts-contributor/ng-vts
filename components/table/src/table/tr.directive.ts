/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  OnDestroy,
  Optional,
  QueryList,
  Input
} from '@angular/core';
import { combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { VtsCellFixedDirective } from '../cell/cell-fixed.directive';
import { VtsThMeasureDirective } from '../cell/th-measure.directive';
import { VtsTableStyleService } from '../table-style.service';

@Directive({
  selector:
    'tr:not([mat-row]):not([mat-header-row]):not([vts-table-measure-row]):not([vtsExpand]):not([vts-table-fixed-row])',
  host: {
    '[class.vts-table-row]': 'isInsideTable',
    '[class.vts-table-row-odd]': 'isOdd',
    '[class.vts-table-row-even]': '!isOdd'
  }
})
export class VtsTrDirective implements AfterContentInit, OnDestroy {
  @Input() isOdd: boolean = true;
  @ContentChildren(VtsThMeasureDirective)
  listOfVtsThDirective!: QueryList<VtsThMeasureDirective>;
  @ContentChildren(VtsCellFixedDirective)
  listOfCellFixedDirective!: QueryList<VtsCellFixedDirective>;
  private destroy$ = new Subject<void>();
  private listOfFixedColumns$ = new ReplaySubject<VtsCellFixedDirective[]>(1);
  private listOfColumns$ = new ReplaySubject<VtsThMeasureDirective[]>(1);
  listOfFixedColumnsChanges$: Observable<VtsCellFixedDirective[]> = this.listOfFixedColumns$.pipe(
    switchMap(list =>
      merge(
        ...[this.listOfFixedColumns$, ...list.map((c: VtsCellFixedDirective) => c.changes$)]
      ).pipe(mergeMap(() => this.listOfFixedColumns$))
    ),
    takeUntil(this.destroy$)
  );
  listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(
    map(list => list.filter(item => item.vtsLeft !== false))
  );
  listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(
    map(list => list.filter(item => item.vtsRight !== false))
  );
  listOfColumnsChanges$: Observable<VtsThMeasureDirective[]> = this.listOfColumns$.pipe(
    switchMap(list =>
      merge(...[this.listOfColumns$, ...list.map((c: VtsThMeasureDirective) => c.changes$)]).pipe(
        mergeMap(() => this.listOfColumns$)
      )
    ),
    takeUntil(this.destroy$)
  );
  isInsideTable = false;

  constructor(@Optional() private vtsTableStyleService: VtsTableStyleService) {
    this.isInsideTable = !!vtsTableStyleService;
  }

  ngAfterContentInit(): void {
    if (this.vtsTableStyleService) {
      this.listOfCellFixedDirective.changes
        .pipe(startWith(this.listOfCellFixedDirective), takeUntil(this.destroy$))
        .subscribe(this.listOfFixedColumns$);
      this.listOfVtsThDirective.changes
        .pipe(startWith(this.listOfVtsThDirective), takeUntil(this.destroy$))
        .subscribe(this.listOfColumns$);
      /** set last left and first right **/
      this.listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeft => {
        listOfFixedLeft.forEach(cell =>
          cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1])
        );
      });
      this.listOfFixedRightColumnChanges$.subscribe(listOfFixedRight => {
        listOfFixedRight.forEach(cell => cell.setIsFirstRight(cell === listOfFixedRight[0]));
      });
      /** calculate fixed vtsLeft and vtsRight **/
      combineLatest([
        this.vtsTableStyleService.listOfListOfThWidth$,
        this.listOfFixedLeftColumnChanges$
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([listOfAutoWidth, listOfLeftCell]) => {
          listOfLeftCell.forEach((cell, index) => {
            if (cell.isAutoLeft) {
              const currentArray = listOfLeftCell.slice(0, index);
              const count = currentArray.reduce(
                (pre, cur) => pre + (cur.colspan || cur.colSpan || 1),
                0
              );
              const width = listOfAutoWidth.slice(0, count).reduce((pre, cur) => pre + cur, 0);
              cell.setAutoLeftWidth(`${width}px`);
            }
          });
        });
      combineLatest([
        this.vtsTableStyleService.listOfListOfThWidth$,
        this.listOfFixedRightColumnChanges$
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([listOfAutoWidth, listOfRightCell]) => {
          listOfRightCell.forEach((_, index) => {
            const cell = listOfRightCell[listOfRightCell.length - index - 1];
            if (cell.isAutoRight) {
              const currentArray = listOfRightCell.slice(
                listOfRightCell.length - index,
                listOfRightCell.length
              );
              const count = currentArray.reduce(
                (pre, cur) => pre + (cur.colspan || cur.colSpan || 1),
                0
              );
              const width = listOfAutoWidth
                .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                .reduce((pre, cur) => pre + cur, 0);
              cell.setAutoRightWidth(`${width}px`);
            }
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
