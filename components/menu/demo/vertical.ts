import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-vertical',
  template: `
    <ul vts-menu [vtsMode]="'vertical'">
      <li vts-submenu vtsTitle="Navigation One" vtsIcon="Mail">
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu (vtsOpenChange)="change($event)" vtsTitle="Navigation Two" vtsIcon="Extension">
        <ul>
          <li vts-menu-item>Option 5</li>
          <li vts-menu-item>Option 6</li>
          <li vts-submenu vtsTitle="Submenu">
            <ul>
              <li vts-menu-item>Option 7</li>
              <li vts-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="Settings">
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `,
  styles: [
    `
      [vts-menu] {
        width: 240px;
      }
    `
  ]
})
export class VtsDemoMenuVerticalComponent {
  change(value: boolean): void {
    console.log(value);
  }
}
