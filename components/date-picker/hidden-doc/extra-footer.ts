import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-extra-footer',
  template: `
    <vts-date-picker [vtsRenderExtraFooter]="footerRender"></vts-date-picker>
    <br />
    <vts-date-picker [vtsRenderExtraFooter]="plainFooter" vtsShowTime></vts-date-picker>
    <vts-range-picker [vtsRenderExtraFooter]="footerRender"></vts-range-picker>
    <vts-range-picker [vtsRenderExtraFooter]="plainFooter" vtsShowTime></vts-range-picker>
    <vts-date-picker vtsMode="month" [vtsRenderExtraFooter]="footerRender"></vts-date-picker>
  `,
  styles: [
    `
      vts-date-picker,
      vts-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerExtraFooterComponent {
  plainFooter = 'plain extra footer';
  footerRender = () => 'extra footer';
}
