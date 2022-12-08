import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-progress-dot',
  template: `
    <vts-steps [vtsCurrent]="1" vtsProgressDot>
      <vts-step vtsTitle="Finished" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="In Progress" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
    <vts-divider></vts-divider>
    <vts-steps [vtsCurrent]="1" vtsProgressDot vtsDirection="vertical">
      <vts-step
        vtsTitle="Finished"
        vtsDescription="This is a description. This is a description."
      ></vts-step>
      <vts-step
        vtsTitle="Finished"
        vtsDescription="This is a description. This is a description."
      ></vts-step>
      <vts-step
        vtsTitle="In Progress"
        vtsDescription="This is a description. This is a description."
      ></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsProgressDotComponent {}
