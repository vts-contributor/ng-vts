import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-dynamic',
  template: `
    <div>
      <label>
        Gap:
        <vts-input-number
          [vtsMin]="0"
          [vtsMax]="16"
          [vtsStep]="1"
          [(ngModel)]="gap"
        ></vts-input-number>
      </label>
    </div>
    <p></p>
    <vts-avatar
      [vtsGap]="gap"
      [ngStyle]="{ 'background-color': '#0593CF', 'vertical-align': 'middle' }"
      vtsText="Demo"
      vtsSize="sm"
    ></vts-avatar>
  `
})
export class VtsDemoAvatarDynamicComponent {
  gap = 4;
}
