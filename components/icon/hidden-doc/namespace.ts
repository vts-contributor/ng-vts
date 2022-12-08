import { Component } from '@angular/core';
import { VtsIconService } from '@ui-vts/ng-vts/icon';

const ngVtsIconLiteral = `<svg width="43" height="32" viewBox="0 0 43 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.8872 0C34.6172 0 32.7256 1.34907 31.8068 3.29173L22.2945 23.4738C22.0783 23.9595 21.6189 24.715 21.2406 24.715C20.8622 24.715 20.4298 23.9325 20.1866 23.4738L10.6203 3.29173C9.70147 1.34907 7.80982 0 5.53984 0H0L15.1332 29.1939C16.6195 32.0539 19.7002 31.9999 21.2676 31.9999C23.4295 31.9999 25.9697 31.892 27.3209 29.1939L42.4271 0H36.8872Z"/>
  </svg>`;

@Component({
  selector: 'vts-demo-icon-namespace',
  template: `
    <div class="icons-list">
      <i vts-icon vtsType="ng-vts:logo" style="color:black"></i>
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
export class VtsDemoIconNamespaceComponent {
  constructor(private iconService: VtsIconService) {
    // Static Load
    this.iconService.addIconLiteral('ng-vts:logo', ngVtsIconLiteral);

    // Dynamic load
    // Put logo.svg in assets/@ui-vts/ng-vts/logo.svg
  }
}
