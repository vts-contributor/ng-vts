import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VtsModalService } from '@ui-vts/ng-vts/modal';
import { VtsTabsCanDeactivateFn } from '@ui-vts/ng-vts/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'vts-demo-tabs-guard',
  template: `
    <vts-tabset [vtsCanDeactivate]="canDeactivate">
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="'Tab' + tab">Content of tab {{ tab }}</vts-tab>
    </vts-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsDemoTabsGuardComponent {
  tabs = [1, 2, 3, 4];
  constructor(private modal: VtsModalService) {}

  canDeactivate: VtsTabsCanDeactivateFn = (fromIndex: number, toIndex: number) => {
    switch (fromIndex) {
      case 0:
        return toIndex === 1;
      case 1:
        return Promise.resolve(toIndex === 2);
      case 2:
        return this.confirm();
      default:
        return true;
    }
  };

  private confirm(): Observable<boolean> {
    return new Observable(observer => {
      this.modal.confirm({
        vtsTitle: 'Are you sure you want to leave this tab?',
        vtsOnOk: () => {
          observer.next(true);
          observer.complete();
        },
        vtsOnCancel: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
