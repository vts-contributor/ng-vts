import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tooltip-template',
  template: `
    <a vts-tooltip [vtsTooltipTitle]="titleTemplate">This Tooltip has an Icon</a>
    <ng-template #titleTemplate>
      <i vts-icon vtsType="DescriptionOutline"></i>
      <span>Tooltip With Icon</span>
    </ng-template>
  `,
  styles: [
    `
      .vtsicon {
        margin-right: 8px;
        margin-left: 8px;
      }
    `
  ]
})
export class VtsDemoTooltipTemplateComponent {}
