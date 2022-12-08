import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-rate-text',
  template: `
    <vts-rate [(ngModel)]="value" [vtsTooltips]="tooltips"></vts-rate>
    <span *ngIf="value" class="vts-rate-text">
      {{ value ? tooltips[value - 1] : '' }}
    </span>
  `
})
export class VtsDemoRateTextComponent {
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
}
