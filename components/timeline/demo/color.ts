import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-timeline-color',
  template: `
    <vts-timeline>
      <vts-timeline-item vtsColor="green">Create a services site 2015-09-01</vts-timeline-item>
      <vts-timeline-item vtsColor="green">
        Solve initial network problems 2015-09-01
      </vts-timeline-item>
      <vts-timeline-item vtsColor="red">
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2015-09-01</p>
      </vts-timeline-item>
      <vts-timeline-item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </vts-timeline-item>
      <vts-timeline-item vtsColor="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </vts-timeline-item>
      <vts-timeline-item vtsColor="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </vts-timeline-item>
    </vts-timeline>
  `
})
export class VtsDemoTimelineColorComponent {}
