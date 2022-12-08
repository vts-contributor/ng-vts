import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-gutter',
  template: `
    <vts-divider vtsOrientation="left" vtsText="Horizontal"></vts-divider>
    <div vts-row [vtsGutter]="16">
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
    </div>
    <vts-divider vtsOrientation="left" vtsText="Responsive"></vts-divider>
    <div vts-row [vtsGutter]="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
    </div>
    <vts-divider vtsOrientation="left" vtsText="Vertical"></vts-divider>
    <div vts-row [vtsGutter]="[16, 24]">
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
      <div vts-col class="gutter-row" [vtsSpan]="6">
        <div class="inner-box">col-6</div>
      </div>
    </div>
  `,
  styles: [
    `
      vts-divider {
        color: #333;
        fontweight: normal;
      }
      .inner-box {
        background: #f56685;
        padding: 8px 0;
      }
    `
  ]
})
export class VtsDemoGridGutterComponent {}
