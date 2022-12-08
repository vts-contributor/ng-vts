import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-simple',
  template: `
    <vts-steps [vtsCurrent]="1">
      <vts-step vtsTitle="Finished" vtsDescription="This is a description."></vts-step>
      <vts-step
        vtsTitle="In Progress"
        vtsSubtitle="Left 00:00:08"
        vtsDescription="This is a description."
      ></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsSimpleComponent {}
