import { Component } from '@angular/core';
import { VtsSkeletonButtonShape, VtsSkeletonButtonSize } from '@ui-vts/ng-vts/skeleton';

@Component({
  selector: 'vts-demo-skeleton-button',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <vts-radio-group *vtsSpaceItem [(ngModel)]="size">
        <label vts-radio-button vtsValue="xl">XL</label>
        <label vts-radio-button vtsValue="lg">LG</label>
        <label vts-radio-button vtsValue="md">MD</label>
        <label vts-radio-button vtsValue="sm">SM</label>
        <label vts-radio-button vtsValue="xs">XS</label>
      </vts-radio-group>
      <vts-radio-group *vtsSpaceItem [(ngModel)]="shape">
        <label vts-radio-button vtsValue="circle">Circle</label>
        <label vts-radio-button vtsValue="rounded">Rounded</label>
        <label vts-radio-button vtsValue="square">Square</label>
      </vts-radio-group>
      <span *vtsSpaceItem>
        Active: &nbsp;
        <vts-switch [(ngModel)]="active"></vts-switch>
      </span>
    </vts-space>
    <br />
    <br />
    <p>Example:</p>
    <vts-skeleton-element
      vtsType="button"
      [vtsActive]="active"
      [vtsSize]="size"
      [vtsShape]="shape"
    ></vts-skeleton-element>
  `,
  styles: []
})
export class VtsDemoSkeletonButtonComponent {
  size: VtsSkeletonButtonSize = 'md';
  shape: VtsSkeletonButtonShape = 'square';
  active: boolean = false;
}
