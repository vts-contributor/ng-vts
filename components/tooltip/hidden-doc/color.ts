import { Component } from '@angular/core';
import { presetColors } from '@ui-vts/ng-vts/core/color';

@Component({
  selector: 'vts-demo-tooltip-color',
  template: `
    <vts-divider vtsText="Preset" vtsOrientation="left"></vts-divider>
    <button
      *ngFor="let color of presetColors"
      vts-button
      vts-tooltip
      [vtsTooltipTitle]="color"
      [vtsTooltipColor]="color"
    >
      {{ color }}
    </button>
    <vts-divider vtsText="Custom" vtsOrientation="left"></vts-divider>
    <button
      *ngFor="let color of customColors"
      vts-button
      vts-tooltip
      [vtsTooltipTitle]="color"
      [vtsTooltipColor]="color"
    >
      {{ color }}
    </button>
  `,
  styles: [
    `
      .vts-btn {
        margin-right: 8px;
        margin-bottom: 8px;
      }

      .vts-tag {
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoTooltipColorComponent {
  customColors: string[] = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
  presetColors = presetColors;
}
