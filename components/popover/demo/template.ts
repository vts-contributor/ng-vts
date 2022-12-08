import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popover-template',
  template: `
    <button
      vts-button
      vts-popover
      [vtsPopoverTitle]="titleTemplate"
      [vtsPopoverContent]="contentTemplate"
    >
      Render Template
    </button>
    <ng-template #titleTemplate>
      <i vts-icon vtsType="Close"></i>
      Title
    </ng-template>
    <ng-template #contentTemplate>
      <i vts-icon vtsType="check"></i>
      Content
    </ng-template>
  `
})
export class VtsDemoPopoverTemplateComponent {}
