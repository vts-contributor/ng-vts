import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-tag-colorful',
  encapsulation: ViewEncapsulation.None,
  template: `
    <h4 style="margin-bottom: 16px;">Presets:</h4>
    <div>
      <vts-tag [vtsColor]="'magenta'">magenta</vts-tag>
      <vts-tag [vtsColor]="'red'">red</vts-tag>
      <vts-tag [vtsColor]="'volcano'">volcano</vts-tag>
      <vts-tag [vtsColor]="'orange'">orange</vts-tag>
      <vts-tag [vtsColor]="'gold'">gold</vts-tag>
      <vts-tag [vtsColor]="'lime'">lime</vts-tag>
      <vts-tag [vtsColor]="'green'">green</vts-tag>
      <vts-tag [vtsColor]="'cyan'">cyan</vts-tag>
      <vts-tag [vtsColor]="'blue'">blue</vts-tag>
      <vts-tag [vtsColor]="'geekblue'">geekblue</vts-tag>
      <vts-tag [vtsColor]="'purple'">purple</vts-tag>
    </div>
    <h4 style="margin: 16px 0px;'">Custom:</h4>
    <div>
      <vts-tag [vtsColor]="'#f50'">#f50</vts-tag>
      <vts-tag [vtsColor]="'#2db7f5'">#2db7f5</vts-tag>
      <vts-tag [vtsColor]="'#87d068'">#87d068</vts-tag>
      <vts-tag [vtsColor]="'#108ee9'">#108ee9</vts-tag>
    </div>
  `,
  styles: [
    `
      .vts-tag {
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoTagColorfulComponent {}
