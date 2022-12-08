import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-card',
  template: `
    <vts-tabset vtsType="card">
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="'Tab' + tab">
        Content of Tab Pane {{ tab }}
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsCardComponent {
  tabs = [1, 2, 3];
}
