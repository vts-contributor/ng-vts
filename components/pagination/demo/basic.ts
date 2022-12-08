import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-basic',
  template: `
    <vts-pagination [vtsPageIndex]="1" [vtsTotal]="50"></vts-pagination>
  `
})
export class VtsDemoPaginationBasicComponent {}
