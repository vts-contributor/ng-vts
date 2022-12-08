import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-extra',
  template: `
    <vts-tabset [vtsTabBarExtraContent]="extraTemplate">
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="'Tab ' + tab">Content of tab {{ tab }}</vts-tab>
    </vts-tabset>
    <ng-template #extraTemplate>
      <button vts-button>Extra Action</button>
    </ng-template>
  `
})
export class VtsDemoTabsExtraComponent {
  tabs = [1, 2, 3];
}
