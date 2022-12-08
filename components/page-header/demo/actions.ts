import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-page-header-actions',
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
        <vts-descriptions vtsSize="small" [vtsColumn]="3">
          <vts-descriptions-item vtsTitle="Created" [vtsSpan]="1">Lili Qu</vts-descriptions-item>
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
      </vts-page-header-content>
    </vts-page-header>
    <br />
    <vts-page-header vtsBackIcon>
      <vts-page-header-title>Title</vts-page-header-title>
      <vts-page-header-subtitle>This is a subtitle</vts-page-header-subtitle>
      <vts-page-header-tags>
        <vts-tag vtsColor="blue">Runing</vts-tag>
      </vts-page-header-tags>
      <vts-page-header-extra>
        <button vts-button>Operation</button>
        <button vts-button>Operation</button>
        <button vts-button vtsType="primary">Primary</button>
      </vts-page-header-extra>
      <vts-page-header-content>
        <vts-row vtsType="flex">
          <vts-statistic vtsTitle="Status" vtsValue="Pending"></vts-statistic>
          <vts-statistic
            vtsTitle="Price"
            [vtsValue]="568.08"
            vtsPrefix="$"
            style="margin: 0 32px"
          ></vts-statistic>
          <vts-statistic vtsTitle="Balance" [vtsValue]="3345.08" vtsPrefix="$"></vts-statistic>
        </vts-row>
      </vts-page-header-content>
    </vts-page-header>
  `
})
export class VtsDemoPageHeaderActionsComponent {}
