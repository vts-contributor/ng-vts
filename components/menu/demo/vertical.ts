import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-vertical',
  template: `
    <ul vts-menu [vtsMode]="'vertical'">
      <ul vts-submenu vtsTitle="Navigation One" vtsIcon="Settings">
        <ul vts-menu-group vtsTitle="Group 1">
          <li vts-menu-item>Option 1</li>
          <li vts-menu-item>Option 2</li>
        </ul>
        <ul vts-menu-group vtsTitle="Group 2">
          <li vts-menu-item>Option 3</li>
          <li vts-menu-item>Option 4</li>
        </ul>
      </ul>
      <ul
        vts-submenu
        (vtsOpenChange)="change($event)"
        vtsTitle="Navigation Two"
        vtsIcon="Extension"
      >
        <li vts-menu-item>Option 5</li>
        <li vts-menu-item>Option 6</li>
        <ul vts-submenu vtsTitle="Time">
          <li vts-menu-item>Option 7</li>
          <li vts-menu-item>Option 8</li>
        </ul>
      </ul>
      <ul vts-submenu vtsTitle="Navigation Three" vtsIcon="Settings">
        <li vts-menu-item>Option 9</li>
        <li vts-menu-item>Option 10</li>
        <li vts-menu-item>Option 11</li>
      </ul>
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
