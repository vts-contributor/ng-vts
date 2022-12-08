import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-simple',
  template: `
    <vts-pagination [vtsPageIndex]="2" [vtsTotal]="50" vtsSimple></vts-pagination>
  `
})
export class VtsDemoPaginationSimpleComponent {}
