import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-disabled',
  template: `
    <vts-tabset>
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="tab.name" [vtsDisabled]="tab.disabled">
        {{ tab.name }}
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsDisabledComponent {
  tabs = [
    {
      name: 'Tab 1',
      disabled: false
    },
    {
      name: 'Tab 2',
      disabled: true
    },
    {
      name: 'Tab 3',
      disabled: false
    }
  ];
}
