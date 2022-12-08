import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-link',
  template: `
    <a>
      <vts-badge [vtsCount]="5">
        <a class="head-example"></a>
      </vts-badge>
    </a>
  `,
  styles: [
    `
      .head-example {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
})
export class VtsDemoBadgeLinkComponent {}
