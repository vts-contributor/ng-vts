import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-collapse-custom',
  template: `
    <vts-collapse [vtsBordered]="false">
      <vts-collapse-panel
        #p
        *ngFor="let panel of panels; let isFirst = first"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
        [ngStyle]="panel.customStyle"
        [vtsExpandedIcon]="!isFirst ? panel.icon || expandedIcon : undefined"
      >
        <p>{{ panel.name }} content</p>
        <ng-template #expandedIcon let-active>
          {{ active }}
          <i
            vts-icon
            vtsType="caret-right"
            class="vts-collapse-arrow"
            [vtsRotate]="p.vtsActive ? 90 : -90"
          ></i>
        </ng-template>
      </vts-collapse-panel>
    </vts-collapse>
  `
})
export class VtsDemoCollapseCustomComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px'
      }
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      icon: 'double-right',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px'
      }
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px'
      }
    }
  ];
}
