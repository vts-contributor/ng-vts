import { Component } from '@angular/core';
import { VtsSkeletonInputSize } from '@ui-vts/ng-vts/skeleton';

@Component({
  selector: 'vts-demo-skeleton-input',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <vts-radio-group *vtsSpaceItem [(ngModel)]="size">
        <label vts-radio-button vtsValue="xl">XL</label>
        <label vts-radio-button vtsValue="lg">LG</label>
        <label vts-radio-button vtsValue="md">MD</label>
        <label vts-radio-button vtsValue="sm">SM</label>
      </vts-radio-group>
      <span *vtsSpaceItem>
        Active: &nbsp;
        <vts-switch [(ngModel)]="active"></vts-switch>
      </span>
    </vts-space>
    <br />
    <br />
    <p>Example:</p>
    <div>
      <vts-skeleton-element
        vtsType="input"
        [vtsActive]="active"
        [vtsSize]="size"
      ></vts-skeleton-element>
    </div>
  `,
  styles: []
})
export class VtsDemoSkeletonInputComponent {
  size: VtsSkeletonInputSize = 'md';
  active: boolean = false;
}
