import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-responsive',
  template: `
    <div vts-row>
      <div vts-col vtsXs="2" vtsSm="4" vtsMd="6" vtsLg="8" vtsXl="10">Col</div>
      <div vts-col vtsXs="20" vtsSm="16" vtsMd="12" vtsLg="8" vtsXl="4">Col</div>
      <div vts-col vtsXs="2" vtsSm="4" vtsMd="6" vtsLg="8" vtsXl="10">Col</div>
    </div>
  `
})
export class VtsDemoGridResponsiveComponent {}
