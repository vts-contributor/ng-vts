import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-accordion-nested',
  template: `
    <vts-accordion>
      <vts-accordion-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
      >
        <p>{{ panel.name }}</p>
        <div *ngIf="panel.childPanel && panel.childPanel.length > 0">
          <vts-accordion>
            <vts-accordion-panel
              *ngFor="let childPanel of panel.childPanel"
              [vtsHeader]="childPanel.name"
              [vtsActive]="childPanel.active"
            >
              <p>
                This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext.
                For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages.
                The API will pass this information from said software over to Slicktext via API integration.
              </p>
            </vts-accordion-panel>
          </vts-accordion>
        </div>
      </vts-accordion-panel>
    </vts-accordion>
  `
})
export class VtsDemoAccordionNestedComponent {
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
