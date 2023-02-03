import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-accordion-flush',
  template: `
    <vts-accordion vtsFlush>
      <vts-accordion-panel
        *ngFor="let panel of panels"
        [vtsHeader]="panel.name"
        [vtsActive]="panel.active"
        [vtsDisabled]="panel.disabled"
      >
        <span>{{ panel.content }}</span>
      </vts-accordion-panel>
    </vts-accordion>
  `
})
export class VtsDemoAccordionFlushComponent {
  panels = [
    {
      active: true,
      name: 'Vt acordion',
      content:
        'Although you probably won’t get into any legal trouble if you do it just once, why risk it? If you made your subscribers a promise, you should honor that. If not, you run the risk of a drastic increase in opt outs, which will only hurt you in the long run.'
    },
    {
      active: true,
      disabled: true,
      name: 'Vt acordion',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
      active: false,
      name: 'Vt acordion',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English"
    }
  ];
}
