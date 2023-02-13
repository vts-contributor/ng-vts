import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-inline-collapsed',
  template: `
    <div class="wrapper">
      <button vts-button vtsType="primary" (click)="toggleCollapsed()">
        <i vts-icon [vtsType]="'NotesDoutone-1'"></i>
      </button>
      <ul vts-menu vtsOpen vtsMode="inline" [vtsInlineCollapsed]="isCollapsed">
        <ul vts-submenu vtsTitle="Menu 1" vtsIcon="Settings">
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <ul vts-submenu vtsTitle="Options 2" vtsIcon="Time">
            <li vts-menu-item>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
            <li vts-menu-item>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
            <li vts-menu-item>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
            <li vts-menu-item vtsSelected>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
          </ul>
        </ul>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <span>Menu 2</span>
        </li>
        <ul vts-submenu vtsTitle="Menu 3" vtsIcon="Settings">
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <ul vts-submenu vtsTitle="Options 2" vtsIcon="Time">
            <li vts-menu-item>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
            <li vts-menu-item>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
          </ul>
        </ul>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <span>Menu 4</span>
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
