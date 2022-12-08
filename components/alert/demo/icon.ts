import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-icon',
  template: `
    <vts-alert vtsType="success" vtsMessage="Success Tips" vtsShowIcon></vts-alert>
    <vts-alert vtsType="info" vtsMessage="Informational Notes" vtsShowIcon></vts-alert>
    <vts-alert vtsType="warning" vtsMessage="Warning" vtsShowIcon></vts-alert>
    <vts-alert vtsType="error" vtsMessage="Error" vtsShowIcon></vts-alert>
    <vts-alert
      vtsType="success"
      vtsMessage="Success Tips"
      vtsDescription="Detailed description and advices about successful copywriting."
      vtsShowIcon
    ></vts-alert>
    <vts-alert
      vtsType="info"
      vtsMessage="Informational Notes"
      vtsDescription="Additional description and informations about copywriting."
      vtsShowIcon
    ></vts-alert>
    <vts-alert
      vtsType="warning"
      vtsMessage="Warning"
      vtsDescription="This is a warning notice about copywriting."
      vtsShowIcon
    ></vts-alert>
    <vts-alert
      vtsType="error"
      vtsMessage="Error"
      vtsDescription="This is an error message about copywriting."
      vtsShowIcon
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
export class VtsDemoAlertIconComponent {}
