import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-accordion-flush',
  template: `
    <vts-accordion vtsFlush>
      <vts-accordion-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
      >
        <p>{{ panel.name }} content</p>
      </vts-accordion-panel>
    </vts-accordion>
  `
})
export class VtsDemoAccordionFlushComponent {
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
