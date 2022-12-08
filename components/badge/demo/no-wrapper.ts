import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-no-wrapper',
  template: `
    <vts-badge vtsStandalone [vtsCount]="25"></vts-badge>
    <vts-badge
      vtsStandalone
      [vtsCount]="4"
      [vtsStyle]="{
        backgroundColor: '#fff',
        color: '#999',
        boxShadow: '0 0 0 1px #d9d9d9 inset'
      }"
    ></vts-badge>
    <vts-badge
      vtsStandalone
      [vtsCount]="109"
      [vtsStyle]="{ backgroundColor: '#52c41a' }"
    ></vts-badge>
  `,
  styles: [
    `
      vts-badge {
        margin-right: 20px;
      }
    `
  ]
})
export class VtsDemoBadgeNoWrapperComponent {}
