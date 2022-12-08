import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-icon',
  template: `
    <vts-tabset>
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="titleTemplate">
        <ng-template #titleTemplate>
          <i vts-icon [vtsType]="tab.icon"></i>
          {{ tab.name }}
        </ng-template>
        {{ tab.name }}
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsIconComponent {
  tabs = [
    {
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];
}
