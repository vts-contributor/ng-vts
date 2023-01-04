import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-alert-custom-icon',
  template: `
    <vts-alert vtsIconType="Car" vtsMessage="Customize icon" vtsShowIcon></vts-alert>
    <vts-alert vtsType="success" vtsIconType="Face" vtsMessage="Success with icon customized" vtsShowIcon></vts-alert>
  `,
  styles: [
    `
      vts-alert {
        margin-bottom: 1em
      }
    `
  ]
})
export class VtsDemoAlertCustomIconComponent {}
