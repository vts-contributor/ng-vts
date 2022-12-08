import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-customized-progress-dot',
  template: `
    <vts-steps [vtsCurrent]="1" [vtsProgressDot]="progressTemplate">
      <vts-step vtsTitle="Finished" vtsDescription="You can hover on the dot."></vts-step>
      <vts-step vtsTitle="In Progress" vtsDescription="You can hover on the dot."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="You can hover on the dot."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="You can hover on the dot."></vts-step>
    </vts-steps>
    <ng-template #progressTemplate let-dot let-status="status" let-index="index">
      <span
        vts-popover
        vtsPopoverContent="steps {{ index }} status: {{ status }}"
        style="margin-left: -100%;"
      >
        <ng-template [ngTemplateOutlet]="dot"></ng-template>
      </span>
    </ng-template>
  `
})
export class VtsDemoStepsCustomizedProgressDotComponent {}
