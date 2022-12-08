import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-collapse-mix',
  template: `
    <vts-collapse>
      <vts-collapse-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
      >
        <p>{{ panel.name }}</p>
        <div *ngIf="panel.childPanel && panel.childPanel.length > 0">
          <vts-collapse>
            <vts-collapse-panel
              *ngFor="let childPanel of panel.childPanel"
              [vtsHeader]="childPanel.name"
              [vtsActive]="childPanel.active"
            >
              <p>
                A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it
                can be found as a welcome guest in many households across the world.
              </p>
            </vts-collapse-panel>
          </vts-collapse>
        </div>
      </vts-collapse-panel>
    </vts-collapse>
  `
})
export class VtsDemoCollapseMixComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name: 'This is panel header 1-1'
        },
        {
          active: false,
          name: 'This is panel header 1-2'
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
