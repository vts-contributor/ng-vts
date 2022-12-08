import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-jump',
  template: `
    <vts-pagination [vtsPageIndex]="2" [vtsTotal]="500" vtsShowQuickJumper></vts-pagination>
    <br />
    <vts-pagination
      [vtsPageIndex]="2"
      [vtsTotal]="500"
      vtsShowQuickJumper
      vtsDisabled
    ></vts-pagination>
  `
})
export class VtsDemoPaginationJumpComponent {}
