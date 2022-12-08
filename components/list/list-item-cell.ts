/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { defer, merge, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-list-item-extra, [vts-list-item-extra]',
  exportAs: 'vtsListItemExtra',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'vts-list-item-extra'
  }
})
export class VtsListItemExtraComponent {
  constructor() {}
}

@Component({
  selector: 'vts-list-item-action',
  exportAs: 'vtsListItemAction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template><ng-content></ng-content></ng-template>
  `
})
export class VtsListItemActionComponent {
  @ViewChild(TemplateRef) templateRef?: TemplateRef<void>;
  constructor() {}
}

@Component({
  selector: 'ul[vts-list-item-actions]',
  exportAs: 'vtsListItemActions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li *ngFor="let i of actions; let last = last">
      <ng-template [ngTemplateOutlet]="i"></ng-template>
      <em *ngIf="!last" class="vts-list-item-action-split"></em>
    </li>
  `,
  host: {
    class: 'vts-list-item-action'
  }
})
export class VtsListItemActionsComponent implements OnChanges, OnDestroy {
  @Input() vtsActions: Array<TemplateRef<void>> = [];
  @ContentChildren(VtsListItemActionComponent)
  vtsListItemActions!: QueryList<VtsListItemActionComponent>;

  actions: Array<TemplateRef<void>> = [];
  private destroy$ = new Subject();
  private inputActionChanges$ = new Subject<null>();
  private contentChildrenChanges$: Observable<null> = defer(() => {
    if (this.vtsListItemActions) {
      return of(null);
    }
    return this.ngZone.onStable.asObservable().pipe(
      take(1),
      switchMap(() => this.contentChildrenChanges$)
    );
  });

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    merge(this.contentChildrenChanges$, this.inputActionChanges$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.vtsActions.length) {
          this.actions = this.vtsActions;
        } else {
          this.actions = this.vtsListItemActions.map(action => action.templateRef!);
        }
        this.cdr.detectChanges();
      });
  }

  ngOnChanges(): void {
    this.inputActionChanges$.next(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
