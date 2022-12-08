import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-changer',
  template: `
    <vts-pagination
      [vtsPageIndex]="3"
      [vtsTotal]="500"
      vtsShowSizeChanger
      [vtsPageSize]="10"
    ></vts-pagination>
    <br />
    <vts-pagination
      [vtsPageIndex]="3"
      [vtsTotal]="500"
      vtsShowSizeChanger
      [vtsPageSize]="10"
      vtsDisabled
    ></vts-pagination>
  `
})
export class VtsDemoPaginationChangerComponent {}
