import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-clickable',
  template: `
    <vts-steps [vtsCurrent]="index" (vtsIndexChange)="onIndexChange($event)">
      <vts-step
        vtsTitle="Finished"
        [vtsDisabled]="disable"
        vtsDescription="This is a description."
      ></vts-step>
      <vts-step vtsTitle="In Progress" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
    <vts-divider></vts-divider>
    <vts-steps
      vtsDirection="vertical"
      [vtsCurrent]="index"
      (vtsIndexChange)="onIndexChange($event)"
    >
      <vts-step vtsTitle="Finished" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="In Progress" vtsDescription="This is a description."></vts-step>
      <vts-step vtsTitle="Waiting" vtsDescription="This is a description."></vts-step>
    </vts-steps>
  `
})
export class VtsDemoStepsClickableComponent {
  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }
}
