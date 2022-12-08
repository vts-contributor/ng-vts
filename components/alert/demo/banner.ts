import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-banner',
  template: `
    <vts-alert vtsBanner vtsMessage="Warning text"></vts-alert>
    <vts-alert
      vtsBanner
      vtsMessage="Very long warning text warning text text text text text text text"
      vtsCloseable
    ></vts-alert>
    <vts-alert vtsBanner vtsMessage="Warning text without icon" [vtsShowIcon]="false"></vts-alert>
    <vts-alert vtsBanner vtsType="error" vtsMessage="Error text"></vts-alert>
  `,
  styles: [
    `
      vts-alert {
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoAlertBannerComponent {}
