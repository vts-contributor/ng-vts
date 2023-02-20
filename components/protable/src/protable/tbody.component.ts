import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    Optional,
    TemplateRef,
    ViewEncapsulation
  } from '@angular/core';
  import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
  import { BehaviorSubject, Subject } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';
  import { VtsProTableStyleService } from '../protable-style.service';
  
  @Component({
    selector: 'tbody',
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
      <ng-container *ngIf="listOfMeasureColumn$ | async as listOfMeasureColumn">
        <tr
          vts-protable-measure-row
          *ngIf="isInsideTable && listOfMeasureColumn.length"
          [listOfMeasureColumn]="listOfMeasureColumn"
          (listOfAutoWidth)="onListOfAutoWidthChange($event)"
        ></tr>
      </ng-container>
      <ng-content></ng-content>
      <tr class="vts-table-placeholder" vts-table-fixed-row *ngIf="showEmpty$ | async">
        <vts-embed-empty
          vtsComponentName="table"
          [specificContent]="(noResult$ | async)!"
        ></vts-embed-empty>
      </tr>
    `,
    host: {
      '[class.vts-table-tbody]': 'isInsideTable'
    }
  })
  export class VtsTbodyComponent implements OnDestroy {
    isInsideTable = false;
    showEmpty$ = new BehaviorSubject<boolean>(false);
    noResult$ = new BehaviorSubject<string | TemplateRef<VtsSafeAny> | undefined>(undefined);
    listOfMeasureColumn$ = new BehaviorSubject<ReadonlyArray<string>>([]);
    private destroy$ = new Subject<void>();
  
    constructor(@Optional() private vtsTableStyleService: VtsProTableStyleService) {
      this.isInsideTable = !!this.vtsTableStyleService;
      if (this.vtsTableStyleService) {
        const { showEmpty$, noResult$, listOfMeasureColumn$ } = this.vtsTableStyleService;
        noResult$.pipe(takeUntil(this.destroy$)).subscribe(this.noResult$);
        listOfMeasureColumn$.pipe(takeUntil(this.destroy$)).subscribe(this.listOfMeasureColumn$);
        showEmpty$.pipe(takeUntil(this.destroy$)).subscribe(this.showEmpty$);
      }
    }
  
    onListOfAutoWidthChange(listOfAutoWidth: number[]): void {
      this.vtsTableStyleService.setListOfAutoWidth(listOfAutoWidth);
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
  