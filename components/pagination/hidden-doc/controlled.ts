import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-controlled',
  template: `
    <vts-pagination [vtsPageIndex]="3" [vtsTotal]="50"></vts-pagination>
  `
})
export class VtsDemoPaginationControlledComponent {}
