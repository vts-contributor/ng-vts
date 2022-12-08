import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-typography-body',
  template: `
    <div class="example-line">
      <p class="vts-typo-body1">Body 1 : 16</p>
      <div>(Sarabun - Regular - 16px)</div>
    </div>
    <div class="example-line">
      <p class="vts-typo-body2">Body 2 : 14</p>
      <div>(Sarabun - Regular - 14px)</div>
    </div>
    <div class="example-line">
      <p class="vts-typo-link">Link text</p>
      <div>(Sarabun - Regular - 16px)</div>
    </div>
  `,
  styles: [
    `
      * {
        margin: 15px 0;
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
