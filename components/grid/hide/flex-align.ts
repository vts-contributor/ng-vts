import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-flex-align',
  template: `
    <div>
      <p>Align Top</p>
      <div vts-row vtsJustify="center" vtsAlign="top">
        <div vts-col vtsSpan="4"><p class="height-100">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-50">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-120">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-80">col-4</p></div>
      </div>
      <p>Align Center</p>
      <div vts-row vtsJustify="space-around" vtsAlign="middle">
        <div vts-col vtsSpan="4"><p class="height-100">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-50">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-120">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-80">col-4</p></div>
      </div>
      <p>Align Bottom</p>
      <div vts-row vtsJustify="space-between" vtsAlign="bottom">
        <div vts-col vtsSpan="4"><p class="height-100">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-50">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-120">col-4</p></div>
        <div vts-col vtsSpan="4"><p class="height-80">col-4</p></div>
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
export class VtsDemoGridFlexAlignComponent {}
