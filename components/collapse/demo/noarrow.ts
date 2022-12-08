import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-collapse-noarrow',
  template: `
    <vts-collapse>
      <vts-collapse-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
        [vtsShowArrow]="panel.arrow"
      >
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </p>
      </vts-collapse-panel>
    </vts-collapse>
  `
})
export class VtsDemoCollapseNoarrowComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      arrow: true
    },
    {
      active: false,
      arrow: false,
      name: 'This is panel header 2'
    }
  ];
}
