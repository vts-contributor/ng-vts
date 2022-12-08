import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-size',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="small"><span>Small</span></label>
      <label vts-radio-button vtsValue="default"><span>Default</span></label>
      <label vts-radio-button vtsValue="large"><span>Large</span></label>
    </vts-radio-group>
    <vts-tabset [vtsSize]="size">
      <vts-tab *ngFor="let tab of tabs" [vtsTitle]="'Tab ' + tab">Content of tab {{ tab }}</vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsSizeComponent {
  size: 'lg' | 'md' | 'sm' = 'sm';
  tabs = [1, 2, 3];
}
