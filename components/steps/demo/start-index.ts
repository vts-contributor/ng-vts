import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-start-index',
  template: `
    <vts-steps [vtsCurrent]="current" [vtsStartIndex]="3" vtsSize="sm">
      <vts-step vtsTitle="Finished"></vts-step>
      <vts-step vtsTitle="In Progress"></vts-step>
      <vts-step vtsTitle="Waiting"></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsStartIndexComponent {
  current = 3;
}
