import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-timeline-right',
  template: `
    <vts-timeline vtsMode="right">
      <vts-timeline-item>Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Solve initial network problems 2015-09-01</vts-timeline-item>
      <vts-timeline-item [vtsDot]="dotTemplate" vtsColor="red">
        Technical testing 2015-09-01
      </vts-timeline-item>
      <vts-timeline-item>Network problems being solved 2015-09-01</vts-timeline-item>
    </vts-timeline>
    <ng-template #dotTemplate>
      <i vts-icon vtsType="clock-circle-o" style="font-size: 16px;"></i>
    </ng-template>
  `
})
export class VtsDemoTimelineRightComponent {}
