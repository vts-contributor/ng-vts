import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  skip,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import {
  VtsProTableData,
  VtsProTableFilterFn,
  VtsProTableFilterValue,
  VtsProTableQueryParams,
  VtsProTableSortFn,
  VtsProTableSortOrder
} from './protable.types';

@Injectable()
export class VtsProTableDataService implements OnDestroy {
  private destroy$ = new Subject();
  private pageIndex$ = new BehaviorSubject<number>(1);
  private frontPagination$ = new BehaviorSubject<boolean>(true);
  private pageSize$ = new BehaviorSubject<number>(10);
  private listOfData$ = new BehaviorSubject<ReadonlyArray<VtsProTableData>>([]);
  pageIndexDistinct$ = this.pageIndex$.pipe(distinctUntilChanged());
  pageSizeDistinct$ = this.pageSize$.pipe(distinctUntilChanged());
  listOfCalcOperator$ = new BehaviorSubject<
    Array<{
      key?: string;
      sortFn: VtsProTableSortFn | null | boolean;
      sortOrder: VtsProTableSortOrder;
      filterFn: VtsProTableFilterFn | null | boolean;
      filterValue: VtsProTableFilterValue;
      sortPriority: number | boolean;
    }>
  >([]);
  queryParams$: Observable<VtsProTableQueryParams> = combineLatest([
    this.pageIndexDistinct$,
    this.pageSizeDistinct$,
    this.listOfCalcOperator$
  ]).pipe(
    debounceTime(0),
    skip(1),
    map(([pageIndex, pageSize, listOfCalc]) => {
      return {
        pageIndex,
        pageSize,
        sort: listOfCalc
          .filter(item => item.sortFn)
          .map(item => {
            return {
              key: item.key!,
              value: item.sortOrder
            };
          }),
        filter: listOfCalc
          .filter(item => item.filterFn)
          .map(item => {
            return {
              key: item.key!,
              value: item.filterValue
            };
          })
      };
    })
  );
  private listOfDataAfterCalc$ = combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(
    map(([listOfData, listOfCalcOperator]) => {
      let listOfDataAfterCalc = [...listOfData];
      const listOfFilterOperator = listOfCalcOperator.filter(item => {
        const { filterValue, filterFn } = item;
        const isReset =
          filterValue === null ||
          filterValue === undefined ||
          (Array.isArray(filterValue) && filterValue!.length === 0);
        return !isReset && typeof filterFn === 'function';
      });
      for (const item of listOfFilterOperator) {
        const { filterFn, filterValue } = item;
        listOfDataAfterCalc = listOfDataAfterCalc.filter(data =>
          (filterFn as VtsProTableFilterFn)(filterValue, data)
        );
      }
      const listOfSortOperator = listOfCalcOperator
        .filter(item => item.sortOrder !== null && typeof item.sortFn === 'function')
        .sort((a, b) => +b.sortPriority - +a.sortPriority);
      if (listOfCalcOperator.length) {
        listOfDataAfterCalc.sort((record1, record2) => {
          for (const item of listOfSortOperator) {
            const { sortFn, sortOrder } = item;
            if (sortFn && sortOrder) {
              const compareResult = (sortFn as VtsProTableSortFn)(record1, record2, sortOrder);
              if (compareResult !== 0) {
                return sortOrder === 'ascend' ? compareResult : -compareResult;
              }
            }
          }
          return 0;
        });
      }
      return listOfDataAfterCalc;
    })
  );
  private listOfFrontEndCurrentPageData$ = combineLatest([
    this.pageIndexDistinct$,
    this.pageSizeDistinct$,
    this.listOfDataAfterCalc$
  ]).pipe(
    takeUntil(this.destroy$),
    filter(value => {
      const [pageIndex, pageSize, listOfData] = value;
      const maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
      return pageIndex <= maxPageIndex;
    }),
    map(([pageIndex, pageSize, listOfData]) => {
      return listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    })
  );
  listOfCurrentPageData$ = this.frontPagination$.pipe(
    switchMap(pagination => (pagination ? this.listOfFrontEndCurrentPageData$ : this.listOfData$))
  );
  total$ = this.frontPagination$.pipe(
    switchMap(pagination => (pagination ? this.listOfDataAfterCalc$ : this.listOfData$)),
    map(list => list.length),
    distinctUntilChanged()
  );

  updatePageSize(size: number): void {
    this.pageSize$.next(size);
  }
  updateFrontPagination(pagination: boolean): void {
    this.frontPagination$.next(pagination);
  }
  updatePageIndex(index: number): void {
    this.pageIndex$.next(index);
  }
  updateListOfData(list: ReadonlyArray<VtsProTableData>): void {
    this.listOfData$.next(list);
  }
  constructor() { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
