import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-basic',
  template: `
    <div vts-row>
      <div vts-col vtsSpan="12">col-12</div>
      <div vts-col vtsSpan="12">col-12</div>
    </div>
    <div vts-row>
      <div vts-col vtsSpan="8">col-8</div>
      <div vts-col vtsSpan="8">col-8</div>
      <div vts-col vtsSpan="8">col-8</div>
    </div>
    <div vts-row>
      <div vts-col vtsSpan="6">col-6</div>
      <div vts-col vtsSpan="6">col-6</div>
      <div vts-col vtsSpan="6">col-6</div>
      <div vts-col vtsSpan="6">col-6</div>
    </div>
  `
})
export class VtsDemoGridBasicComponent {}
