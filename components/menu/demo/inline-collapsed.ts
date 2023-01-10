import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-inline-collapsed',
  template: `
    <div class="wrapper">
      <button vts-button vtsType="primary" (click)="toggleCollapsed()">
        <i vts-icon [vtsType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"></i>
      </button>
      <ul vts-menu vtsMode="inline" vtsTheme="dark" [vtsInlineCollapsed]="isCollapsed">
        <li
          vts-menu-item
          vts-tooltip
          vtsTooltipPlacement="right"
          [vtsTooltipTitle]="isCollapsed ? 'Navigation One' : ''"
          vtsSelected
        >
          <i vts-icon vtsType="Mail"></i>
          <span>Navigation One</span>
        </li>
        <li vts-submenu vtsTitle="Navigation Two" vtsIcon="Extension">
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
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 240px;
      }

      button {
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoMenuInlineCollapsedComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
