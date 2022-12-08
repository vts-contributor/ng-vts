import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-page-header-basic',
  template: `
    <vts-page-header
      class="site-page-header"
      (vtsBack)="onBack()"
      vtsBackIcon
      vtsTitle="Title"
      vtsSubtitle="This is a subtitle"
    ></vts-page-header>
  `
})
export class VtsDemoPageHeaderBasicComponent {
  onBack(): void {
    console.log('onBack');
  }
}
