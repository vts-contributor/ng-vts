import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-typography-heading',
  template: `
    <div class="example-line">
      <h1 vts-typography vtsType="h1">Heading 1 : 36</h1>
      <div>(BeauSan Pro - SemiBold - 36px)</div>
    </div>
    <div class="example-line">
      <h2 vts-typography vtsType="h2">Heading 2 : 32</h2>
      <div>(BeauSan Pro - SemiBold - 32px)</div>
    </div>
    <div class="example-line">
      <h3 vts-typography vtsType="h3">Heading 3 : 24</h3>
      <div>(BeauSan Pro - SemiBold - 24px)</div>
    </div>
    <div class="example-line">
      <h4 vts-typography vtsType="h4">Heading 4 : 24</h4>
      <div>(Sarabun - Bold - 24px)</div>
    </div>
    <div class="example-line">
      <h5 vts-typography vtsType="h5">Heading 5 : 16</h5>
      <div>(Sarabun - Bold - 16px)</div>
    </div>
    <div class="example-line">
      <p vts-typography vtsType="sub1">Subtitle 1 : 20</p>
      <div>(Sarabun - Bold - 20px)</div>
    </div>
    <div class="example-line">
      <p vts-typography vtsType="sub2">Subtitle 2 : 16</p>
      <div>(Sarabun - Bold - 16px)</div>
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
export class VtsDemoTypographyHeadingComponent {}
