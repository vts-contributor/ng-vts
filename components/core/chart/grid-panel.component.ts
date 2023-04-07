import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'g[ngx-charts-grid-panel]',
  template: `
    <svg:rect [attr.height]="height" [attr.width]="width" [attr.x]="x" [attr.y]="y" stroke="none" class="gridpanel" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPanelComponent {
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() x: number = 0;
  @Input() y: number = 0;
}
