import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-custom-content',
  template: `
    <vts-select vtsShowSearch vtsAllowClear vtsPlaceHolder="Select OS" [(ngModel)]="selectedOS">
      <vts-option vtsCustomContent vtsLabel="Windows" vtsValue="windows">
        <i vts-icon vtsType="windows"></i>
        Windows
      </vts-option>
      <vts-option vtsCustomContent vtsLabel="Mac" vtsValue="mac">
        <i vts-icon vtsType="apple"></i>
        Mac
      </vts-option>
      <vts-option vtsCustomContent vtsLabel="Android" vtsValue="android">
        <i vts-icon vtsType="android"></i>
        Android
      </vts-option>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 200px;
      }
    `
  ]
})
export class VtsDemoSelectCustomContentComponent {
  selectedOS = null;
}
