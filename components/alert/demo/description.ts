import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-description',
  template: `
    <vts-alert
      vtsType="success"
      vtsMessage="Success Text"
      vtsDescription="Success Description Success Description Success Description"
    ></vts-alert>
    <vts-alert
      vtsType="info"
      vtsMessage="Info Text"
      vtsDescription="Info Description Info Description Info Description Info Description"
    ></vts-alert>
    <vts-alert
      vtsType="warning"
      vtsMessage="Warning Text"
      vtsDescription="Warning Description Warning Description Warning Description Warning Description"
    ></vts-alert>
    <vts-alert
      vtsType="error"
      vtsMessage="Error Text"
      vtsDescription="Error Description Error Description Error Description Error Description"
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
export class VtsDemoAlertDescriptionComponent {}
