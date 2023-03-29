/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  Optional,
  TemplateRef,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  AfterContentInit,
  AfterViewInit
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsTableStyleService } from '../table-style.service';
import { VtsTrDirective } from './tr.directive';

@Component({
  selector: 'tbody',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="listOfMeasureColumn$ | async as listOfMeasureColumn">
      <tr
        vts-table-measure-row
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
export class VtsTbodyComponent implements OnDestroy, AfterContentInit, AfterViewInit {
  @ContentChildren(VtsTrDirective, { descendants: true })
  listOfVtsTrDirective!: QueryList<VtsTrDirective>;
  isInsideTable = false;
  showEmpty$ = new BehaviorSubject<boolean>(false);
  noResult$ = new BehaviorSubject<string | TemplateRef<VtsSafeAny> | undefined>(undefined);
  listOfMeasureColumn$ = new BehaviorSubject<ReadonlyArray<string>>([]);
  private destroy$ = new Subject<void>();

  constructor(@Optional() private vtsTableStyleService: VtsTableStyleService) {
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

  ngAfterViewInit() {
    if (this.listOfVtsTrDirective.length) {
      this.listOfVtsTrDirective.toArray().forEach((r, i) => (r.isOdd = i % 2 == 1));
    }
  }

  ngAfterContentInit(): void {
    this.listOfVtsTrDirective.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((rows: QueryList<VtsTrDirective>) => {
        rows.toArray().forEach((r, i) => (r.isOdd = i % 2 == 1));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
