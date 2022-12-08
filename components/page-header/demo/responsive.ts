import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-page-header-responsive',
  template: `
    <vts-page-header class="site-page-header" vtsBackIcon>
      <vts-page-header-title>Title</vts-page-header-title>
      <vts-page-header-subtitle>This is a subtitle</vts-page-header-subtitle>
      <vts-page-header-extra>
        <button vts-button>Operation</button>
        <button vts-button>Operation</button>
        <button vts-button vtsType="primary">Primary</button>
      </vts-page-header-extra>
      <vts-page-header-content>
        <div class="content">
          <div class="main">
            <vts-descriptions vtsSize="small" [vtsColumn]="2">
              <vts-descriptions-item vtsTitle="Created" [vtsSpan]="1">
                Lili Qu
              </vts-descriptions-item>
              <vts-descriptions-item vtsTitle="Association" [vtsSpan]="1">
                <a>421421</a>
              </vts-descriptions-item>
              <vts-descriptions-item vtsTitle="Creation Time" [vtsSpan]="1">
                2017-01-10
              </vts-descriptions-item>
              <vts-descriptions-item vtsTitle="Effective Time" [vtsSpan]="1">
                2017-10-10
              </vts-descriptions-item>
              <vts-descriptions-item vtsTitle="Remarks" [vtsSpan]="2">
                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
              </vts-descriptions-item>
            </vts-descriptions>
          </div>
          <div class="extra">
            <div>
              <vts-statistic vtsTitle="Status" vtsValue="Pending"></vts-statistic>
              <vts-statistic
                vtsTitle="Price"
                [vtsValue]="568.08"
                vtsPrefix="$"
                style="margin: 0 32px"
              ></vts-statistic>
            </div>
          </div>
        </div>
      </vts-page-header-content>
      <vts-page-header-footer>
        <vts-tabset [vtsSelectedIndex]="1">
          <vts-tab vtsTitle="Details"></vts-tab>
          <vts-tab vtsTitle="Rule"></vts-tab>
        </vts-tabset>
      </vts-page-header-footer>
    </vts-page-header>
  `,
  styles: [
    `
      .content {
        display: flex;
      }
      .extra > div {
        display: flex;
        width: max-content;
        justify-content: flex-end;
      }
      @media (max-width: 576px) {
        .content {
          display: block;
        }

        .main {
          width: 100%;
          margin-bottom: 12px;
        }

        .extra {
          width: 100%;
          margin-left: 0;
          text-align: left;
        }
      }
    `
  ]
})
export class VtsDemoPageHeaderResponsiveComponent {}
