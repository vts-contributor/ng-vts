import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-small-size',
  template: `
    <vts-steps [vtsCurrent]="current" vtsSize="sm">
      <vts-step vtsTitle="Finished"></vts-step>
      <vts-step vtsTitle="In Progress"></vts-step>
      <vts-step vtsTitle="Waiting"></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsSmallSizeComponent {
  current = 1;
}
