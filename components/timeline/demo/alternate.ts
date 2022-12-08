import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-timeline-alternate',
  template: `
    <vts-timeline vtsMode="alternate">
      <vts-timeline-item>Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item vtsColor="green">
        Solve initial network problems 2015-09-01
      </vts-timeline-item>
      <vts-timeline-item [vtsDot]="dotTemplate">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo.
      </vts-timeline-item>
      <vts-timeline-item vtsColor="red">Network problems being solved 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item [vtsDot]="dotTemplate">Technical testing 2015-09-01</vts-timeline-item>
    </vts-timeline>
    <ng-template #dotTemplate>
      <i vts-icon vtsType="clock-circle-o" style="font-size: 16px;"></i>
    </ng-template>
  `
})
export class VtsDemoTimelineAlternateComponent {}
