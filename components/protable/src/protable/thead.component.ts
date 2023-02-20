import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
  } from '@angular/core';
  import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
  
  import { EMPTY, merge, Observable, of, Subject } from 'rxjs';
  import { delay, map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
  import { VtsThAddOnComponent } from '../cell/th-addon.component';
  import { VtsProTableDataService } from '../protable-data.service';
  import { VtsProTableStyleService } from '../protable-style.service';
  import { VtsTrDirective } from './tr.directive';
  
  @Component({
    selector: 'thead:not(.vts-table-thead)',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-container *ngIf="!isInsideTable">
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </ng-container>
    `
  })
  export class VtsTheadComponent implements AfterContentInit, OnDestroy, AfterViewInit, OnInit {
    private destroy$ = new Subject<void>();
    isInsideTable = false;
    @ViewChild('contentTemplate', { static: true })
    templateRef!: TemplateRef<VtsSafeAny>;
    @ContentChildren(VtsTrDirective, { descendants: true })
    listOfVtsTrDirective!: QueryList<VtsTrDirective>;
    @ContentChildren(VtsThAddOnComponent, { descendants: true })
    listOfVtsThAddOnComponent!: QueryList<VtsThAddOnComponent>;
    @Output() readonly vtsSortOrderChange = new EventEmitter<{
      key: VtsSafeAny;
      value: string | null;
    }>();
  
    constructor(
      private elementRef: ElementRef,
      private renderer: Renderer2,
      @Optional() private vtsTableStyleService: VtsProTableStyleService,
      @Optional() private vtsTableDataService: VtsProTableDataService
    ) {
      this.isInsideTable = !!this.vtsTableStyleService;
    }
  
    ngOnInit(): void {
      if (this.vtsTableStyleService) {
        this.vtsTableStyleService.setTheadTemplate(this.templateRef);
      }
    }
  
    ngAfterContentInit(): void {
      if (this.vtsTableStyleService) {
        const firstTableRow$ = this.listOfVtsTrDirective.changes.pipe(
          startWith(this.listOfVtsTrDirective),
          map(item => item && item.first)
        ) as Observable<VtsTrDirective>;
        const listOfColumnsChanges$ = firstTableRow$.pipe(
          switchMap(firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY)),
          takeUntil(this.destroy$)
        );
        listOfColumnsChanges$.subscribe(data => this.vtsTableStyleService.setListOfTh(data));
        /** TODO: need reset the measure row when scrollX change **/
        this.vtsTableStyleService.enableAutoMeasure$
          .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : of([]))))
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => this.vtsTableStyleService.setListOfMeasureColumn(data));
        const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(
          switchMap(firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY)),
          takeUntil(this.destroy$)
        );
        const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(
          switchMap(firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY)),
          takeUntil(this.destroy$)
        );
        listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeftColumn => {
          this.vtsTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
        });
        listOfFixedRightColumnChanges$.subscribe(listOfFixedRightColumn => {
          this.vtsTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
        });
      }
      if (this.vtsTableDataService) {
        const listOfColumn$ = this.listOfVtsThAddOnComponent.changes.pipe(
          startWith(this.listOfVtsThAddOnComponent)
        ) as Observable<QueryList<VtsThAddOnComponent>>;
        const manualSort$ = listOfColumn$.pipe(
          switchMap(() => merge(...this.listOfVtsThAddOnComponent.map(th => th.manualClickOrder$))),
          takeUntil(this.destroy$)
        );
        manualSort$.subscribe((data: VtsThAddOnComponent) => {
          const emitValue = { key: data.vtsColumnKey, value: data.sortOrder };
          this.vtsSortOrderChange.emit(emitValue);
          if (data.vtsSortFn && data.vtsSortPriority === false) {
            this.listOfVtsThAddOnComponent
              .filter(th => th !== data)
              .forEach(th => th.clearSortOrder());
          }
        });
        const listOfCalcOperator$ = listOfColumn$.pipe(
          switchMap(list =>
            merge(
              ...[listOfColumn$, ...list.map((c: VtsThAddOnComponent) => c.calcOperatorChange$)]
            ).pipe(mergeMap(() => listOfColumn$))
          ),
          map(list =>
            list
              .filter(item => !!item.vtsSortFn || !!item.vtsFilterFn)
              .map(item => {
                const {
                  vtsSortFn,
                  sortOrder,
                  vtsFilterFn,
                  vtsFilterValue,
                  vtsSortPriority,
                  vtsColumnKey
                } = item;
                return {
                  key: vtsColumnKey,
                  sortFn: vtsSortFn,
                  sortPriority: vtsSortPriority,
                  sortOrder: sortOrder!,
                  filterFn: vtsFilterFn!,
                  filterValue: vtsFilterValue
                };
              })
          ),
          // TODO: after checked error here
          delay(0),
          takeUntil(this.destroy$)
        );
        listOfCalcOperator$.subscribe(list => {
          this.vtsTableDataService.listOfCalcOperator$.next(list);
        });
      }
    }
  
    ngAfterViewInit(): void {
      if (this.vtsTableStyleService) {
        this.renderer.removeChild(
          this.renderer.parentNode(this.elementRef.nativeElement),
          this.elementRef.nativeElement
        );
      }
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
  