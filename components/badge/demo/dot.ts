import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-dot',
  template: `
    <vts-badge vtsDot><i vts-icon vtsType="Notifications"></i></vts-badge>
    <vts-badge vtsDot [vtsShowDot]="false">
      <i vts-icon vtsType="Notifications"></i>
    </vts-badge>
    <vts-badge vtsDot>
      <a>Link something</a>
    </vts-badge>
  `,
  styles: [
    `
      vts-badge {
        margin-right: 20px;
      }

      [vts-icon] {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
      }
    `
  ]
})
export class VtsDemoBadgeDotComponent {}
