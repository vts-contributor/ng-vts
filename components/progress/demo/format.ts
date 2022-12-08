import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-format',
  template: `
    <vts-progress [vtsPercent]="75" vtsType="circle" [vtsFormat]="formatOne"></vts-progress>
    <vts-progress [vtsPercent]="100" vtsType="circle" [vtsFormat]="formatTwo"></vts-progress>
  `,
  styles: [
    `
      vts-progress {
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-block;
      }
    `
  ]
})
export class VtsDemoProgressFormatComponent {
  formatOne = (percent: number) => `${percent} Days`;
  formatTwo = () => `Done`;
}
