import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-search',
  template: `
    <vts-select
      vtsShowSearch
      vtsAllowClear
      vtsPlaceHolder="Select a person"
      [(ngModel)]="selectedValue"
    >
      <vts-option vtsLabel="Jack" vtsValue="jack"></vts-option>
      <vts-option vtsLabel="Lucy" vtsValue="lucy"></vts-option>
      <vts-option vtsLabel="Tom" vtsValue="tom"></vts-option>
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
export class VtsDemoSelectSearchComponent {
  selectedValue = null;
}
