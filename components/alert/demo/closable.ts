import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-closable',
  template: `
    <vts-alert
      vtsType="warning"
      vtsCloseable
      vtsMessage="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
      (vtsOnClose)="afterClose()"
    ></vts-alert>
    <vts-alert
      vtsType="error"
      vtsCloseable
      vtsMessage="Error Text"
      vtsDescription="Error Description Error Description Error Description Error Description Error Description Error Description"
      (vtsOnClose)="afterClose()"
    ></vts-alert>
  `,
  styles: [
    `
      vts-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class VtsDemoAlertClosableComponent {
  afterClose(): void {
    console.log('close');
  }
}
