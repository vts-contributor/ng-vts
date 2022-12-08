import { Component } from '@angular/core';
import { VtsIconService } from '@ui-vts/ng-vts/icon';

@Component({
  selector: 'vts-demo-icon-iconfont',
  template: `
    <div class="icons-list">
      <i vts-icon [vtsIconfont]="'icon-tuichu'"></i>
      <i vts-icon [vtsIconfont]="'icon-facebook'"></i>
      <i vts-icon [vtsIconfont]="'icon-twitter'"></i>
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
export class VtsDemoIconIconfontComponent {
  constructor(private iconService: VtsIconService) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }
}
