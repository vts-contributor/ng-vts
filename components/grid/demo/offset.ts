import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-offset',
  template: `
    <div vts-row>
      <div vts-col vtsSpan="8">col-8</div>
      <div vts-col vtsSpan="8" vtsOffset="8">col-8</div>
    </div>
    <div vts-row>
      <div vts-col vtsSpan="6" vtsOffset="6">col-6 col-offset-6</div>
      <div vts-col vtsSpan="6" vtsOffset="6">col-6 col-offset-6</div>
    </div>
    <div vts-row>
      <div vts-col vtsSpan="12" vtsOffset="6">col-12 col-offset-6</div>
    </div>
  `
})
export class VtsDemoGridOffsetComponent {}
