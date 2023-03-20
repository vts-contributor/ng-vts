import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-custom-trigger',
  template: `
    <vts-layout>
      <vts-sider vtsWidth="240px" [vtsCollapsed]="isCollapsed">
        <div class="logo"></div>
        <ul vts-menu vtsMode="inline">
          <ul vts-submenu vtsOpen vtsTitle="Menu item name" vtsIcon="Settings">
            <li vts-menu-item>Sub menu name</li>
            <li vts-menu-item>Sub menu name</li>
            <li vts-menu-item>Sub menu name</li>
          </ul>
          <ul vts-submenu vtsTitle="Menu item name" vtsIcon="Time">
            <li vts-menu-item>Sub menu name</li>
            <li vts-menu-item>Sub menu name</li>
            <li vts-menu-item>Sub menu name</li>
          </ul>
          <ul vts-submenu vtsTitle="Menu item name" vtsIcon="Settings">
            <li vts-menu-item>Sub menu name</li>
            <li vts-menu-item>Sub menu name</li>
            <li vts-menu-item>Sub menu name</li>
          </ul>
          <li vts-menu-item>
            <i vts-icon vtsType="Delete"></i>
            <span>Menu item name</span>
          </li>
        </ul>
      </vts-sider>
      <vts-layout>
        <vts-header>
          <button vts-button vtsType="primary" class="trigger" (click)="toggleCollapsed()">
            <i vts-icon [vtsType]="'NotesDoutone-1'"></i>
          </button>
          <ul vts-menu vtsMode="horizontal">
            <ul vts-submenu vtsTitle="Menu 1">
              <li vts-menu-item>Sub menu 1</li>
              <ul vts-submenu vtsTitle="Sub menu 1">
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
              </ul>
              <li vts-menu-item>Sub menu 1</li>
              <ul vts-submenu vtsTitle="Sub menu 1">
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
              </ul>
            </ul>
            <li vts-menu-item>Menu 3</li>
            <ul vts-submenu vtsTitle="Menu 4">
              <li vts-menu-item>Sub menu 1</li>
              <ul vts-submenu vtsTitle="Sub menu 1">
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
              </ul>
              <li vts-menu-item>Sub menu 1</li>
              <ul vts-submenu vtsTitle="Sub menu 1">
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
                <li vts-menu-item>Sub menu 1</li>
              </ul>
            </ul>
            <li vts-menu-item>Menu 5</li>
          </ul>
        </vts-header>
        <vts-layout>
          <vts-content>
            <vts-breadcrumb>
              <vts-breadcrumb-item vtsLabel="Home" vtsIcon="HomeOutline"></vts-breadcrumb-item>
              <vts-breadcrumb-item
                vtsLabel="Content"
                vtsIcon="LayerOutline"
                vtsDisabled
              ></vts-breadcrumb-item>
              <vts-breadcrumb-item
                vtsLabel="An Application"
                vtsIcon="ViewWeekOutline"
                [vtsUrl]="['/components', 'button', 'en']"
              ></vts-breadcrumb-item>
              <vts-breadcrumb-item vtsLabel="Application 1"></vts-breadcrumb-item>
            </vts-breadcrumb>
            <div class="inner-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </vts-content>
          <vts-footer>
            <div vts-typo vtsAlign="center">© Viettel Bussiness Solutions</div>
          </vts-footer>
        </vts-layout>
      </vts-layout>
    </vts-layout>
  `,
  styles: [
    `
      :host {
        min-width: 900px;
        display: block;
      }

      .logo {
        width: 120px;
        height: 60px;
        background-image: url('data:image/png;base64,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');
        background-size: contain;
        background-position: left top 5px;
        background-repeat: no-repeat;
        float: left;
        margin-left: 24px;
        margin-top: 8px;
      }

      .vts-layout-sider-collapsed .logo {
        display: none;
      }

      vts-breadcrumb {
        margin-bottom: 24px;
      }

      .inner-content {
        max-width: 700px;
      }

      .vts-layout-sider .vts-menu {
        height: 100%;
      }

      .trigger {
        float: left;
        margin-top: calc((56px - 32px) / 2);
        margin-right: 24px;
      }
    `
  ]
})
export class VtsDemoLayoutCustomTriggerComponent {
  isCollapsed = false;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
