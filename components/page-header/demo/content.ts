import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-page-header-content',
  template: `
    <vts-page-header class="site-page-header">
      <!--breadcrumb-->
      <vts-breadcrumb vts-page-header-breadcrumb>
        <vts-breadcrumb-item>First-level Menu</vts-breadcrumb-item>
        <vts-breadcrumb-item>
          <a>Second-level Menu</a>
        </vts-breadcrumb-item>
        <vts-breadcrumb-item>Third-level Menu</vts-breadcrumb-item>
      </vts-breadcrumb>

      <!--avatar-->
      <vts-avatar
        vts-page-header-avatar
        vtsSrc="https://avatars0.githubusercontent.com/u/22736418?s=88&v=4"
      ></vts-avatar>

      <!--title-->
      <vts-page-header-title>Title</vts-page-header-title>

      <!--subtitle-->
      <vts-page-header-subtitle>This is a subtitle</vts-page-header-subtitle>

      <!--tags-->
      <vts-page-header-tags>
        <vts-tag [vtsColor]="'blue'">Running</vts-tag>
      </vts-page-header-tags>

      <!--extra-->
      <vts-page-header-extra>
        <button vts-button>Operation</button>
        <button vts-button>Operation</button>
        <button vts-button vtsType="primary">Primary</button>
        <button
          vts-button
          vtsNoAnimation
          vts-dropdown
          [vtsDropdownMenu]="menu"
          style="border: none; padding: 0"
        >
          <i vts-icon vtsType="ViewHeadline" style="font-size: 20px; vertical-align: top;"></i>
        </button>
        <vts-dropdown-menu #menu="vtsDropdownMenu">
          <ul vts-menu>
            <li vts-menu-item>1st menu item length</li>
            <li vts-menu-item>2nd menu item length</li>
            <li vts-menu-item>3rd menu item length</li>
          </ul>
        </vts-dropdown-menu>
      </vts-page-header-extra>

      <!--content-->
      <vts-page-header-content>
        <div vts-row>
          <div class="content">
            <p vts-paragraph>
              Ant Design interprets the color system into two levels: a system-level color system
              and a product-level color system.
            </p>
            <p vts-paragraph>
              Ant Design's design team preferred to design with the HSB color model, which makes it
              easier for designers to have a clear psychological expectation of color when adjusting
              colors, as well as facilitate communication in teams.
            </p>
            <div class="content-link">
              <a>
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                  alt="start"
                />
                Quick Start
              </a>
              <a>
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                  alt="info"
                />
                Product Info
              </a>
              <a>
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                  alt="doc"
                />
                Product Doc
              </a>
            </div>
          </div>
          <div class="content-image">
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
              alt="content"
            />
          </div>
        </div>
      </vts-page-header-content>
    </vts-page-header>
  `,
  styles: [
    `
      .content {
        flex: 1;
      }

      .content p {
        margin-bottom: 1em;
      }

      .content-link a {
        margin-right: 16px;
      }

      .content-link a img {
        margin-right: 8px;
      }

      .content-image {
        margin: 0 0 0 60px;
        display: flex;
        align-items: center;
      }

      .content-image img {
        width: 100%;
      }

      @media (max-width: 768px) {
        .content-image {
          flex: 100%;
          margin: 24px 0 0;
        }
      }
    `
  ]
})
export class VtsDemoPageHeaderContentComponent {}
