import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-timeline-position',
  template: `
    <vts-timeline vtsMode="custom">
      <vts-timeline-item vtsPosition="left" [vtsDot]="soccerTemplate">Alice 20'</vts-timeline-item>
      <vts-timeline-item vtsPosition="left" [vtsDot]="soccerTemplate">Susan 28'</vts-timeline-item>
      <vts-timeline-item vtsPosition="right" vtsColor="red" [vtsDot]="soccerTemplate">
        Tim 45'
      </vts-timeline-item>
      <vts-timeline-item vtsPosition="left" [vtsDot]="soccerTemplate">Bob 79'</vts-timeline-item>
    </vts-timeline>
    <ng-template #soccerTemplate>⚽</ng-template>
  `
})
export class VtsDemoTimelinePositionComponent {}
