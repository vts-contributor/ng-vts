import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-vertical',
  template: `
    <vts-steps [vtsCurrent]="1" vtsDirection="vertical">
      <vts-step vtsTitle="Finished" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="In Progress" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsVerticalComponent {}
