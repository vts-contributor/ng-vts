import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-size',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="xl">Extra large</label>
      <label vts-radio-button vtsValue="lg">Large</label>
      <label vts-radio-button vtsValue="md">Default</label>
      <label vts-radio-button vtsValue="sm">Small</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-date-picker [vtsSize]="size"></vts-date-picker>
    <br />
    <vts-date-picker vtsMode="week" [vtsSize]="size"></vts-date-picker>
    <br />
    <vts-date-picker vtsMode="month" [vtsSize]="size"></vts-date-picker>
    <br />
    <vts-range-picker [vtsSize]="size"></vts-range-picker>
  `,
  styles: [
    `
      vts-date-picker,
      vts-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerSizeComponent {
  size: 'xl' | 'lg' | 'md' | 'sm' = 'md';
}
