import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-spin-custom-indicator',
  template: `
    <ng-template #indicatorTemplate>
      <i vts-icon vtsType="Sync"></i>
    </ng-template>
    <vts-spin vtsSimple [vtsIndicator]="indicatorTemplate"></vts-spin>
  `,
  styles: [
    `
      i {
        font-size: 24px;
      }
    `
  ]
})
export class VtsDemoSpinCustomIndicatorComponent {}
