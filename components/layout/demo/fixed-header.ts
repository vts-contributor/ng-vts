import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-fixed-header',
  template: `
    <vts-layout class="layout">
      <vts-header>
        <div class="logo"></div>
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </vts-content>
      <vts-footer>
        <div vts-typo vtsAlign="center">© Viettel Bussiness Solutions</div>
      </vts-footer>
    </vts-layout>
  `,
  styles: [
    `
      .layout {
        position: relative;
      }

      vts-header {
        position: absolute;
        top: 0;
        width: 100%;
      }

      vts-content {
        margin-top: 56px;
        max-height: 300px;
        overflow: auto;
      }

      .logo {
        width: 120px;
        height: 100%;
        max-height: 100%;
        background-image: url('data:image/png;base64,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');
        background-size: contain;
        background-position: left top 5px;
        background-repeat: no-repeat;
        float: left;
        margin-right: 20px;
      }

      vts-breadcrumb {
        margin-bottom: 24px;
      }

      .inner-content {
        max-width: 700px;
      }
    `
  ]
})
export class VtsDemoLayoutFixedHeaderComponent {}
