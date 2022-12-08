import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-split',
  template: `
    <vts-space [vtsSplit]="spaceSplit">
      <ng-template #spaceSplit>
        <vts-divider vtsType="vertical"></vts-divider>
      </ng-template>

      <a *vtsSpaceItem>Link</a>
      <a *vtsSpaceItem>Link</a>
      <a *vtsSpaceItem>Link</a>
    </vts-space>
  `
})
export class VtsDemoSpaceSplitComponent {
  size = 8;
}
