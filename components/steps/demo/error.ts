import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-error',
  template: `
    <vts-steps [vtsCurrent]="1" vtsStatus="error">
      <vts-step vtsTitle="Finished" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="In Progress" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsErrorComponent {}
