import { Component } from '@angular/core';
import { VtsTabPosition } from '@ui-vts/ng-vts/tabs';

@Component({
  selector: 'vts-demo-tabs-position',
  template: `
    <div style="margin-bottom: 16px;">
      Tab position：
      <vts-select [(ngModel)]="position" style="width: 80px;">
        <vts-option
          *ngFor="let option of options"
          [vtsLabel]="option.label"
          [vtsValue]="option.value"
        ></vts-option>
      </vts-select>
    </div>
    <vts-tabset [vtsTabPosition]="position">
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="'Tab ' + tab">Content of tab {{ tab }}</vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsPositionComponent {
  position: VtsTabPosition = 'top';
  tabs = [1, 2, 3];
  options = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'right', label: 'right' },
    { value: 'bottom', label: 'bottom' }
  ];
}
