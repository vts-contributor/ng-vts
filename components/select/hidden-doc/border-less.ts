import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-border-less',
  template: `
    <vts-select ngModel="lucy" vtsBorderless>
      <vts-option vtsValue="jack" vtsLabel="Jack"></vts-option>
      <vts-option vtsValue="lucy" vtsLabel="Lucy"></vts-option>
      <vts-option vtsValue="disabled" vtsLabel="Disabled" vtsDisabled></vts-option>
    </vts-select>
    <vts-select ngModel="lucy" vtsDisabled vtsBorderless>
      <vts-option vtsValue="lucy" vtsLabel="Lucy"></vts-option>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        margin: 0 8px 10px 0;
        width: 120px;
      }
    `
  ]
})
export class VtsDemoSelectBorderLessComponent {}
