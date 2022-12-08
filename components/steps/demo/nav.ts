import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-nav',
  template: `
    <vts-steps
      vtsType="navigation"
      vtsSize="sm"
      [vtsCurrent]="index"
      (vtsIndexChange)="onIndexChange($event)"
    >
      <vts-step
        vtsTitle="Step 1"
        vtsSubtitle="00:00:05"
        vtsStatus="finish"
        vtsDescription="This is a description."
      ></vts-step>
      <vts-step
        vtsTitle="Step 2"
        vtsSubtitle="00:01:02"
        vtsStatus="process"
        vtsDescription="This is a description."
      ></vts-step>
      <vts-step
        vtsTitle="Step 3"
        vtsSubtitle="waiting for long long time"
        vtsStatus="wait"
        vtsDescription="This is a description."
      ></vts-step>
    </vts-steps>
    <vts-steps vtsType="navigation" [vtsCurrent]="index" (vtsIndexChange)="onIndexChange($event)">
      <vts-step vtsTitle="Step 1" vtsStatus="finish"></vts-step>
      <vts-step vtsTitle="Step 2" vtsStatus="process"></vts-step>
      <vts-step vtsTitle="Step 3" vtsStatus="wait"></vts-step>
      <vts-step vtsTitle="Step 4" vtsStatus="wait"></vts-step>
    </vts-steps>
    <vts-steps
      vtsType="navigation"
      vtsSize="sm"
      [vtsCurrent]="index"
      (vtsIndexChange)="onIndexChange($event)"
    >
      <vts-step vtsTitle="finish 1" vtsStatus="finish"></vts-step>
      <vts-step vtsTitle="finish 2" vtsStatus="finish"></vts-step>
      <vts-step vtsTitle="current process" vtsStatus="process"></vts-step>
      <vts-step vtsTitle="wait" vtsStatus="wait" vtsDisabled></vts-step>
    </vts-steps>
  `,
  styles: [
    `
      vts-steps {
        display: block;
        margin-bottom: 60px;
        box-shadow: rgb(232, 232, 232) 0px -1px 0px 0 inset;
      }
    `
  ]
})
export class VtsDemoStepsNavComponent {
  index = 0;

  onIndexChange(event: number): void {
    this.index = event;
  }
}
