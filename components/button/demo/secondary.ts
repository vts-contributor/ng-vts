import { Component } from '@angular/core';
import { VtsButtonSize } from '@ui-vts/ng-vts/button';

@Component({
  selector: 'vts-demo-button-secondary',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="xl">XL</label>
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
      <label vts-radio-button vtsValue="xs">XS</label>
    </vts-radio-group>
    <br />
    <br />
    <button vts-button [vtsSize]="size" vtsType="default">Secondary</button>
    <button vts-button [vtsSize]="size" vtsType="default" disabled>Secondary</button>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }

      vts-button-group [vts-button] {
        margin-right: 0;
      }
    `
  ]
})
export class VtsDemoButtonSecondaryComponent {
  size: VtsButtonSize = 'md';
}
