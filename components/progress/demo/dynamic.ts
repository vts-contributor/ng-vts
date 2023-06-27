import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-dynamic',
  template: `
    <vts-progress [vtsPercent]="percent"></vts-progress>
    <vts-button-group>
      <button vts-button (click)="decline()">
        <i vts-icon vtsType="minus"></i>
      </button>
      <button vts-button (click)="increase()">
        <i vts-icon vtsType="PlusOutline:antd"></i>
      </button>
    </vts-button-group>
  `
})
export class VtsDemoProgressDynamicComponent {
  percent = 0;

  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }
}
