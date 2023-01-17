import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-fill',
  template: `
    <vts-alert
      vtsTheme="fill"
      vtsType="success"
      vtsMessage="Success!"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      vtsShowIcon
      vtsCloseable
    ></vts-alert>
    <vts-alert
      vtsTheme="fill"
      vtsType="info"
      vtsMessage="Info! "
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      vtsShowIcon
      vtsCloseable
    ></vts-alert>
    <vts-alert
      vtsTheme="fill"
      vtsType="warning"
      vtsMessage="Warning!"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      vtsCloseable
      vtsShowIcon
    ></vts-alert>
    <vts-alert
      vtsTheme="fill"
      vtsType="error"
      vtsMessage="Error!"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      vtsCloseable
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
export class VtsDemoAlertFillComponent {}
