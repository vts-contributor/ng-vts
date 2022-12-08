import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-collapse-accordion',
  template: `
    <vts-collapse vtsAccordion>
      <vts-collapse-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
      >
        <p>{{ panel.name }} content</p>
      </vts-collapse-panel>
    </vts-collapse>
  `
})
export class VtsDemoCollapseAccordionComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      name: 'This is panel header 3'
    }
  ];
}
