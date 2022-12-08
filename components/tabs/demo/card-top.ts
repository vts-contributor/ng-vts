import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-card-top',
  template: `
    <div class="card-container">
      <vts-tabset vtsType="card">
        <vts-tab *ngFor="let tab of tabs" [vtsTitle]="'Tab Title ' + tab">
          <p>Content of Tab Pane {{ tab }}</p>
          <p>Content of Tab Pane {{ tab }}</p>
          <p>Content of Tab Pane {{ tab }}</p>
        </vts-tab>
      </vts-tabset>
    </div>
  `,
  styles: [
    `
      :host {
        background: #f5f5f5;
        overflow: hidden;
        padding: 24px;
        display: block;
      }

      .card-container ::ng-deep p {
        margin: 0;
      }
      .card-container ::ng-deep > .vts-tabs-card .vts-tabs-content {
        height: 120px;
        margin-top: -16px;
      }
      .card-container ::ng-deep > .vts-tabs-card .vts-tabs-content > .vts-tabs-tabpane {
        background: #fff;
        padding: 16px;
      }
      .card-container ::ng-deep > .vts-tabs-card > .vts-tabs-nav::before {
        display: none;
      }
      .card-container ::ng-deep > .vts-tabs-card .vts-tabs-tab {
        border-color: transparent;
        background: transparent;
      }
      .card-container ::ng-deep > .vts-tabs-card .vts-tabs-tab-active {
        border-color: #fff;
        background: #fff;
      }
    `
  ]
})
export class VtsDemoTabsCardTopComponent {
  tabs = [1, 2, 3];
}
