import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-router',
  template: `
    <ul vts-menu vtsMode="horizontal">
      <li vts-menu-item vtsMatchRouter>
        <a [routerLink]="['/', 'components', 'menu', 'en']">English Menu Document</a>
      </li>
      <li vts-menu-item vtsMatchRouter>
        <a [routerLink]="['/', 'components', 'menu', 'zh']">Chinese Menu Document</a>
      </li>
    </ul>
  `
})
export class VtsDemoMenuRouterComponent {}
