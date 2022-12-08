import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-collapse-ghost',
  template: `
    <vts-collapse vtsGhost>
      <vts-collapse-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
        [vtsDisabled]="panel.disabled"
      >
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </p>
      </vts-collapse-panel>
    </vts-collapse>
  `
})
export class VtsDemoCollapseGhostComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];
}
