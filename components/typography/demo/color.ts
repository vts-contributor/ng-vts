import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-typography-color',
  template: `
    <div class="example-line">
      <p vts-typography>Default Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="secondary">Secondary Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="primary">Primary Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="info">Info Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="success">Success Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="processing">Processing Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="error">Error Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="highlight">Highlight Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="warning">Warning Color</p>
    </div>
    <div class="example-line">
      <p vts-typography vtsColor="disabled">Disabled Color</p>
    </div>
  `,
  styles: [
    `
      * {
        margin: 10px 0;
      }
    `,
    `
      .example-line {
        display: flex;
        flex-wrap: wrap;
      }
      .example-line div {
        margin-left: 10px;
        display: flex;
        align-items: flex-end;
        font-size: 15px;
        padding-bottom: 5px;
        color: #73777a;
      }
    `
  ]
})
export class VtsDemoTypographyColorComponent {}
