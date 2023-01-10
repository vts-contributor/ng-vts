import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-accordion-basic',
  template: `
    <vts-accordion [vtsExpandIconPosition]="'left'">
      <vts-accordion-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
        [vtsDisabled]="panel.disabled"
      >
        <p>{{ panel.name }} content</p>
      </vts-accordion-panel>
    </vts-accordion>
  `
})
export class VtsDemoAccordionBasicComponent {
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
      active: true,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      name: 'This is panel header 3'
    }
  ];
}
