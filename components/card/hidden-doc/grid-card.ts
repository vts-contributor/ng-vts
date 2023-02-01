import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-grid-card',
  template: `
    <vts-card vtsTitle="Cart Title">
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
      <div vts-card-grid [ngStyle]="gridStyle">Content</div>
    </vts-card>
  `
})
export class VtsDemoCardGridCardComponent {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
}
