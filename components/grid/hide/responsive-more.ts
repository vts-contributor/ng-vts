import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-responsive-more',
  template: `
    <div vts-row>
      <div vts-col [vtsXs]="{ span: 5, offset: 1 }" [vtsLg]="{ span: 6, offset: 2 }">Col</div>
      <div vts-col [vtsXs]="{ span: 11, offset: 1 }" [vtsLg]="{ span: 6, offset: 2 }">Col</div>
      <div vts-col [vtsXs]="{ span: 5, offset: 1 }" [vtsLg]="{ span: 6, offset: 2 }">Col</div>
    </div>
  `
})
export class VtsDemoGridResponsiveMoreComponent {}
