import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-optgroup',
  template: `
    <vts-select [(ngModel)]="selectedValue" vtsAllowClear vtsPlaceHolder="Choose" vtsShowSearch>
      <vts-option-group vtsLabel="Manager">
        <vts-option vtsValue="jack" vtsLabel="Jack"></vts-option>
        <vts-option vtsValue="lucy" vtsLabel="Lucy"></vts-option>
      </vts-option-group>
      <vts-option-group vtsLabel="Engineer">
        <vts-option vtsValue="tom" vtsLabel="Tom"></vts-option>
      </vts-option-group>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 120px;
      }
    `
  ]
})
export class VtsDemoSelectOptgroupComponent {
  selectedValue = 'lucy';
}
