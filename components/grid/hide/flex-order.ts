import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-flex-order',
  template: `
    <div>
      <div vts-row>
        <div vts-col vtsSpan="6" vtsOrder="4">1 col-order-4</div>
        <div vts-col vtsSpan="6" vtsOrder="3">2 col-order-3</div>
        <div vts-col vtsSpan="6" vtsOrder="2">3 col-order-2</div>
        <div vts-col vtsSpan="6" vtsOrder="1">4 col-order-1</div>
      </div>
    </div>
  `,
  styles: [
    `
      [vts-row] {
        background-color: rgba(128, 128, 128, 0.08);
      }
    `
  ]
})
export class VtsDemoGridFlexOrderComponent {}
