import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-flex',
  template: `
    <div>
      <p>sub-element align left</p>
      <div vts-row vtsJustify="start">
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
      </div>
      <p>sub-element align center</p>
      <div vts-row vtsJustify="center">
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
      </div>
      <p>sub-element align right</p>
      <div vts-row vtsJustify="end">
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
      </div>
      <p>sub-element monospaced arrangement</p>
      <div vts-row vtsJustify="space-between">
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
      </div>
      <p>sub-element align full</p>
      <div vts-row vtsJustify="space-around">
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
        <div vts-col vtsSpan="4">col-4</div>
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
export class VtsDemoGridFlexComponent {}
