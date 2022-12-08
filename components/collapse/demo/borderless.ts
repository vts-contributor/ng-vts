import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-collapse-borderless',
  template: `
    <vts-collapse [vtsBordered]="false">
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
export class VtsDemoCollapseBorderlessComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPannel: [
        {
          active: false,
          disabled: true,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
}
