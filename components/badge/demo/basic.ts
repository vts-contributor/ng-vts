import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-basic',
  template: `
    <vts-badge [vtsCount]="5">
      <a class="head-example"></a>
    </vts-badge>
    <vts-badge [vtsCount]="0" vtsShowZero>
      <a class="head-example"></a>
    </vts-badge>
    <vts-badge [vtsCount]="iconTemplate">
      <a class="head-example"></a>
    </vts-badge>
    <ng-template #iconTemplate>
      <i
        vts-icon
        vtsType="QueryBuilderDoutone"
        class="vts-scroll-number-custom-component"
        style="color: #f5222d"
      ></i>
    </ng-template>
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
export class VtsDemoBadgeBasicComponent {}
