import { Component } from '@angular/core';
import { VtsSkeletonInputSize } from '@ui-vts/ng-vts/skeleton';

@Component({
  selector: 'vts-demo-skeleton-image',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Active: &nbsp;
        <vts-switch [(ngModel)]="active"></vts-switch>
      </span>
    </vts-space>
    <br />
    <br />
    <p>Example:</p>
    <vts-skeleton-element vtsType="image" [vtsActive]="active"></vts-skeleton-element>
  `,
  styles: []
})
export class VtsDemoSkeletonImageComponent {
  size: VtsSkeletonInputSize = 'md';
  active: boolean = false;
}
