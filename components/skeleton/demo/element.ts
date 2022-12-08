import { Component } from '@angular/core';
import {
  VtsSkeletonAvatarShape,
  VtsSkeletonAvatarSize,
  VtsSkeletonButtonShape,
  VtsSkeletonButtonSize,
  VtsSkeletonInputSize
} from '@ui-vts/ng-vts/skeleton';

@Component({
  selector: 'vts-demo-skeleton-element',
  template: `
    <vts-space vtsSize="middle">
      <vts-space-item>
        <vts-skeleton-element
          vtsType="button"
          [vtsActive]="elementActive"
          [vtsSize]="elementSize"
          [vtsShape]="buttonShape"
        ></vts-skeleton-element>
      </vts-space-item>
      <vts-space-item>
        <vts-skeleton-element
          vtsType="avatar"
          [vtsActive]="elementActive"
          [vtsSize]="elementSize"
          [vtsShape]="avatarShape"
        ></vts-skeleton-element>
      </vts-space-item>
      <vts-space-item>
        <vts-skeleton-element
          vtsType="input"
          [vtsActive]="elementActive"
          [vtsSize]="elementSize"
          style="width:200px"
        ></vts-skeleton-element>
      </vts-space-item>
    </vts-space>
    <br />
    <br />
    <vts-skeleton-element vtsType="image" [vtsActive]="elementActive"></vts-skeleton-element>
    <vts-divider></vts-divider>
    <div vts-row vtsAlign="middle" [vtsGutter]="8">
      <div vts-col vtsSpan="10">
        Size:
        <vts-radio-group [(ngModel)]="elementSize">
          <label vts-radio-button vtsValue="default">Default</label>
          <label vts-radio-button vtsValue="large">Large</label>
          <label vts-radio-button vtsValue="small">Small</label>
        </vts-radio-group>
      </div>
      <div vts-col vtsSpan="5">
        Active:
        <vts-switch [(ngModel)]="elementActive"></vts-switch>
      </div>
    </div>
    <br />
    <br />
    <div vts-row vtsAlign="middle" [vtsGutter]="8">
      <div vts-col vtsSpan="10">
        Button Shape:
        <vts-radio-group [(ngModel)]="buttonShape">
          <label vts-radio-button vtsValue="default">Default</label>
          <label vts-radio-button vtsValue="circle">Circle</label>
          <label vts-radio-button vtsValue="round">Round</label>
        </vts-radio-group>
      </div>
      <div vts-col vtsSpan="10">
        Avatar Shape:
        <vts-radio-group [(ngModel)]="avatarShape">
          <label vts-radio-button vtsValue="circle">Circle</label>
          <label vts-radio-button vtsValue="square">Square</label>
        </vts-radio-group>
      </div>
    </div>
  `
})
export class VtsDemoSkeletonElementComponent {
  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  imageActive = false;
  buttonSize: VtsSkeletonButtonSize = 'default';
  avatarSize: VtsSkeletonAvatarSize = 'default';
  inputSize: VtsSkeletonInputSize = 'default';
  elementActive = false;
  buttonShape: VtsSkeletonButtonShape = 'default';
  avatarShape: VtsSkeletonAvatarShape = 'circle';
  elementSize: VtsSkeletonInputSize = 'default';
}
