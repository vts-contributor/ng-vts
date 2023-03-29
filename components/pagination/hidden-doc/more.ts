import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-more',
  template: `
    <vts-pagination [vtsPageIndex]="1" [vtsTotal]="500"></vts-pagination>
  `
})
export class VtsDemoPaginationMoreComponent {}
