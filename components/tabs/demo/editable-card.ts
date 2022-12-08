import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-editable-card',
  template: `
    <vts-tabset
      [(vtsSelectedIndex)]="selectedIndex"
      vtsType="editable-card"
      (vtsAdd)="newTab()"
      (vtsClose)="closeTab($event)"
    >
      <vts-tab *ngFor="let tab of tabs" vtsClosable [vtsTitle]="tab">Content of {{ tab }}</vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsEditableCardComponent {
  tabs = ['Tab 1', 'Tab 2'];
  selectedIndex = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.selectedIndex = this.tabs.length;
  }
}
