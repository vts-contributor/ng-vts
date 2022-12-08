import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-anchor-static',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-anchor [vtsAffix]="false">
      <vts-link vtsHref="#components-anchor-demo-basic" vtsTitle="Basic demo"></vts-link>
      <vts-link vtsHref="#components-anchor-demo-static" vtsTitle="Static demo"></vts-link>
      <vts-link vtsHref="#api" vtsTitle="API">
        <vts-link vtsHref="#vts-anchor" vtsTitle="vts-anchor"></vts-link>
        <vts-link vtsHref="#vts-link" vtsTitle="vts-link"></vts-link>
      </vts-link>
    </vts-anchor>
  `
})
export class VtsDemoAnchorStaticComponent {}
