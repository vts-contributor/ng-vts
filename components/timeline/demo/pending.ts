import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-timeline-pending',
  template: `
    <vts-timeline [vtsPending]="'Recording...'" [vtsReverse]="reverse">
      <vts-timeline-item>Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Solve initial network problems 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Technical testing 2015-09-01</vts-timeline-item>
    </vts-timeline>
    <button vts-button style="margin-top: 16px" vtsType="primary" (click)="toggleReverse()">
      Toggle Reverse
    </button>
  `
})
export class VtsDemoTimelinePendingComponent {
  reverse = false;

  toggleReverse(): void {
    this.reverse = !this.reverse;
  }
}
