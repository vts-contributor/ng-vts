import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-icon-basic',
  template: `
    <div class="icons-list">
      <i vts-icon [vtsType]="'HomeOutline'"></i>
      <i vts-icon [vtsType]="'Setting'"></i>
      <i vts-icon [vtsType]="'Face'"></i>
      <i vts-icon [vtsType]="'Sync'" [vtsSpin]="true"></i>
    </div>
  `,
  styles: [
    `
      [vts-icon] {
        margin-right: 6px;
        font-size: 24px;
      }
    `
  ]
})
export class VtsDemoIconBasicComponent {}
