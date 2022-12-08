import { Component } from '@angular/core';
import { VtsButtonSize } from '@ui-vts/ng-vts/button';

@Component({
  selector: 'vts-demo-button-primary',
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
    <button vts-button [vtsSize]="size" vtsType="primary">Primary</button>
    <button vts-button [vtsSize]="size" vtsType="primary" disabled>Primary</button>
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
export class VtsDemoButtonPrimaryComponent {
  size: VtsButtonSize = 'md';
}
