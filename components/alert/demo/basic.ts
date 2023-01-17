import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-basic',
  template: `
    <vts-alert vtsType="success" vtsMessage="Only Title"></vts-alert>
    <vts-alert
      vtsType="error"
      vtsMessage="Only Description"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ></vts-alert>
    <vts-alert
      vtsType="warning"
      vtsMessage="Title & Description"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ></vts-alert>
    <vts-alert
      vtsType="info"
      vtsCloseable
      vtsMessage="Title & Description with Close Icon"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ></vts-alert>
    <vts-alert
      vtsType="success"
      vtsCloseable
      vtsMessage="Title & Description With Prefix Icon and Close Icon"
      vtsDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ></vts-alert>
    <vts-alert
      vtsType="error"
      vtsIconType="Car"
      vtsCloseable
      vtsMessage="Customize icon"
      vtsShowIcon
    ></vts-alert>
    <vts-alert
      vtsType="warning"
      vtsCloseText="Close text"
      vtsMessage="Customize close text"
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
export class VtsDemoAlertBasicComponent {}
