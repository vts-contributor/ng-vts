import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-custom-add-trigger',
  template: `
    <div style="margin-bottom: 16px;">
      <button vts-button (click)="newTab()">ADD</button>
    </div>
    <vts-tabset
      [(vtsSelectedIndex)]="index"
      vtsType="editable-card"
      vtsHideAdd
      (vtsClose)="closeTab($event)"
    >
      <vts-tab *ngFor="let tab of tabs; let i = index" [vtsClosable]="i > 1" [vtsTitle]="tab">
        Content of {{ tab }}
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsCustomAddTriggerComponent {
  index = 0;
  tabs = ['Tab 1', 'Tab 2'];

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.index = this.tabs.length - 1;
  }
}
