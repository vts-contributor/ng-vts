import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-accordion-nested',
  template: `
    <ng-container *ngTemplateOutlet="panelTemplates; context: { $implicit: panels }"></ng-container>
    <ng-template #panelTemplates let-panels>
      <vts-accordion vtsMultiple>
        <vts-accordion-panel
          *ngFor="let panel of panels"
          [vtsHeader]="panel.name"
          [vtsActive]="panel.active"
          [vtsDisabled]="panel.disabled"
        >
          <ng-container *ngIf="panel.childPanel && panel.childPanel.length > 0; else textOnly">
            <p>{{ panel.content }}</p>
            <div>
              <ng-container
                *ngTemplateOutlet="panelTemplates; context: { $implicit: panel.childPanel }"
              ></ng-container>
            </div>
          </ng-container>
          <ng-template #textOnly>
            <span>{{ panel.content }}</span>
          </ng-template>
        </vts-accordion-panel>
      </vts-accordion>
    </ng-template>
  `
})
export class VtsDemoAccordionNestedComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'Vt acordion',
      content:
        'This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext. For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages. The API will pass this information from said software over to Slicktext via API integration.',
      childPanel: [
        {
          active: true,
          name: 'Vt acordion',
          content:
            "When you are in need of finding a specific subscriber, you will want to use the help of SlickText's search navigation tool, located under the Contacts tab of your Slicktext account. Once here, you will have options to sort by, filter, and search your contacts.",
          childPanel: [
            {
              active: false,
              name: 'Vt acordion',
              content:
                'This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext. For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages. The API will pass this information from said software over to Slicktext via API integration.'
            },
            {
              active: true,
              name: 'Vt acordion',
              content:
                'This opt in method is perfect for those looking to integrate a different software such Shopify or Hubspot with Slicktext. For example, upon cashing out online, a subscriber may submit to have their mobile number to receive marketing messages. The API will pass this information from said software over to Slicktext via API integration.'
            }
          ]
        }
      ]
    },
    {
      active: true,
      disabled: true,
      name: 'Vt acordion',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
      childPanel: [
        {
          active: true,
          name: 'Vt acordion',
          content:
            "When you are in need of finding a specific subscriber, you will want to use the help of SlickText's search navigation tool, located under the Contacts tab of your Slicktext account. Once here, you will have options to sort by, filter, and search your contacts."
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: 'Vt acordion',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
      childPanel: [
        {
          active: false,
          name: 'Vt acordion',
          content:
            "When you are in need of finding a specific subscriber, you will want to use the help of SlickText's search navigation tool, located under the Contacts tab of your Slicktext account. Once here, you will have options to sort by, filter, and search your contacts."
        }
      ]
    }
  ];
}
