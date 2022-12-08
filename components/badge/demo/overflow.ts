import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-overflow',
  template: `
    <vts-badge [vtsCount]="99">
      <a class="head-example"></a>
    </vts-badge>
    <vts-badge [vtsCount]="200">
      <a class="head-example"></a>
    </vts-badge>
    <vts-badge [vtsCount]="200" [vtsOverflowCount]="10">
      <a class="head-example"></a>
    </vts-badge>
    <vts-badge [vtsCount]="10000" [vtsOverflowCount]="999">
      <a class="head-example"></a>
    </vts-badge>
  `,
  styles: [
    `
      vts-badge {
        margin-right: 20px;
      }

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
export class VtsDemoBadgeOverflowComponent {}
