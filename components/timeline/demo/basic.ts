import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-timeline-basic',
  template: `
    <vts-timeline>
      <vts-timeline-item>Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Solve initial network problems 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Technical testing 2015-09-01</vts-timeline-item>
      <vts-timeline-item>Network problems being solved 2015-09-01</vts-timeline-item>
    </vts-timeline>
  `
})
export class VtsDemoTimelineBasicComponent {}
