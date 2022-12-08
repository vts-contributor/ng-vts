import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-icon-twotone',
  template: `
    <div class="icons-list">
      <i vts-icon [vtsType]="'smile'"></i>
      <i vts-icon [vtsType]="'heart'" [vtsTwotoneColor]="'#eb2f96'"></i>
      <i vts-icon [vtsType]="'check-circle'" [vtsTwotoneColor]="'#52c41a'"></i>
    </div>
  `,
  styles: [
    `
      .icons-list > .vtsicon {
        margin-right: 6px;
        font-size: 24px;
      }
    `
  ]
})
export class VtsDemoIconTwotoneComponent {}
