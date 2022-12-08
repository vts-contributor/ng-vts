import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-sort',
  template: `
    <div vts-row>
      <div vts-col [vtsSpan]="18" [vtsPush]="6">col-18 col-push-6</div>
      <div vts-col [vtsSpan]="6" [vtsPull]="18">col-6 col-pull-18</div>
    </div>
  `
})
export class VtsDemoGridSortComponent {}
