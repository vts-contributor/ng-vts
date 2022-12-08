import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-icon',
  template: `
    <vts-steps>
      <vts-step vtsTitle="Login" vtsStatus="finish" vtsIcon="user"></vts-step>
      <vts-step vtsTitle="Verification" vtsStatus="finish" vtsIcon="solution"></vts-step>
      <vts-step vtsTitle="Pay" vtsStatus="process" vtsIcon="loading"></vts-step>
      <vts-step vtsTitle="Done" vtsStatus="wait" [vtsIcon]="iconTemplate"></vts-step>
      <ng-template #iconTemplate><i vts-icon vtsType="Face"></i></ng-template>
    </vts-steps>
  `
})
export class VtsDemoStepsIconComponent {}
