import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-typography-body',
  template: `
    <div class="example-line">
      <p vts-typography vtsType="body1">Body 1 : 16</p>
      <div>(Sarabun - Regular - 16px)</div>
    </div>
    <div class="example-line">
      <p vts-typography vtsType="body2">Body 2 : 14</p>
      <div>(Sarabun - Regular - 14px)</div>
    </div>
    <div class="example-line">
      <a vts-typography vtsType="link" href="javascript:void(0)">Link text</a>
      <div>(Sarabun - Regular - 16px)</div>
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
export class VtsDemoTypographyBodyComponent {}
