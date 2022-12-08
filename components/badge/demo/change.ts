import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-change',
  template: `
    <div>
      <vts-badge [vtsCount]="count">
        <a class="head-example"></a>
      </vts-badge>
      <vts-button-group>
        <button vts-button (click)="minCount()">
          <i vts-icon vtsType="ArrowMiniDown"></i>
        </button>
        <button vts-button (click)="addCount()">
          <i vts-icon vtsType="ArrowMiniUp"></i>
        </button>
      </vts-button-group>
    </div>
    <br />
    <div>
      <vts-badge [vtsDot]="dot">
        <a class="head-example"></a>
      </vts-badge>
      <vts-switch [(ngModel)]="dot"></vts-switch>
    </div>
  `,
  styles: [
    `
      vts-badge {
        margin-right: 20px;
      }

      vts-badge.vts-badge-rtl {
        margin-right: 0;
        margin-left: 20px;
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
export class VtsDemoBadgeChangeComponent {
  count = 5;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
    if (this.count < 0) {
      this.count = 0;
    }
  }
}
