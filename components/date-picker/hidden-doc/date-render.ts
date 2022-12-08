import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-date-render',
  template: `
    <vts-date-picker [vtsDateRender]="tplRender"></vts-date-picker>
    <vts-range-picker [vtsDateRender]="tplRender"></vts-range-picker>

    <ng-template #tplRender let-current>
      <div class="vts-picker-cell-inner" [class.border]="current.getDate() === 1">
        {{ current.getDate() }}
      </div>
    </ng-template>
  `,
  styles: [
    `
      vts-date-picker,
      vts-range-picker {
        margin: 0 8px 12px 0;
      }
      .border {
        border: 1px solid #1890ff;
        border-radius: 50%;
      }
    `
  ]
})
export class VtsDemoDatePickerDateRenderComponent {}
