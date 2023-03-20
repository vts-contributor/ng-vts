import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-circle',
  template: `
    <div vts-space vtsDirection="vertical" vtsPreset="4">
      <div *vtsSpaceItem vts-space vtsPreset="3" vtsAlign="center" vtsWrap>
        <vts-avatar
          *vtsSpaceItem
          vtsSize="xxs"
          vtsText="xxs"
          style="background-color:#8F9294;"
        ></vts-avatar>
        <vts-avatar
          *vtsSpaceItem
          vtsSize="xs"
          vtsText="xs"
          style="background-color:#62798F;"
        ></vts-avatar>
        <vts-avatar
          *vtsSpaceItem
          vtsSize="sm"
          vtsText="sm"
          style="background-color:#00AB76;"
        ></vts-avatar>
        <vts-avatar
          *vtsSpaceItem
          vtsSize="md"
          vtsText="md"
          style="background-color:#0593CF;"
        ></vts-avatar>
        <vts-avatar
          *vtsSpaceItem
          vtsSize="lg"
          vtsText="lg"
          style="background-color:#F86A1A;"
        ></vts-avatar>
        <vts-avatar
          *vtsSpaceItem
          vtsSize="xl"
          vtsText="xl"
          style="background-color:#EE0033;"
        ></vts-avatar>
      </div>
      <div *vtsSpaceItem vts-space vtsPreset="3" vtsAlign="center" vtsWrap>
        <vts-avatar *vtsSpaceItem vtsSize="xxs" [vtsSrc]="image"></vts-avatar>
        <vts-avatar *vtsSpaceItem vtsSize="xs" [vtsSrc]="image"></vts-avatar>
        <vts-avatar *vtsSpaceItem vtsSize="sm" [vtsSrc]="image"></vts-avatar>
        <vts-avatar *vtsSpaceItem vtsSize="md" [vtsSrc]="image"></vts-avatar>
        <vts-avatar *vtsSpaceItem vtsSize="lg" [vtsSrc]="image"></vts-avatar>
        <vts-avatar *vtsSpaceItem vtsSize="xl" [vtsSrc]="image"></vts-avatar>
      </div>
    </div>
  `
})
export class VtsDemoAvatarCircleComponent {
  image =
    'data:image/png;base64,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';
}
