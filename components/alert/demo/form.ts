import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-form',
  template: `
    <vts-alert
      vtsType="success"
      vtsMessage="Success Tips"
      vtsDescription="Detailed description and advices about successful copywriting."
      vtsShowIcon
      vtsForm
      vtsCloseable 
    ></vts-alert>
    <vts-alert
      vtsType="info"
      vtsMessage="Informational Notes"
      vtsDescription="Additional description and informations about copywriting."
      vtsShowIcon
      vtsCloseable
      vtsForm
    ></vts-alert>
    <vts-alert
      vtsType="warning"
      vtsMessage="Warning"
      vtsDescription="This is a warning notice about copywriting."
      vtsCloseable
      vtsShowIcon
      vtsForm
    ></vts-alert>
    <vts-alert
      vtsType="error"
      vtsMessage="Error"
      vtsDescription="This is an error message about copywriting."
      vtsCloseable
      vtsShowIcon
      vtsForm
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
export class VtsDemoAlertFormComponent {}
