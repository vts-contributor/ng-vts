import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-page-header-ghost',
  template: `
    <div class="site-page-header-ghost-wrapper">
      <vts-page-header vtsBackIcon [vtsGhost]="false">
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
    </div>
  `
})
export class VtsDemoPageHeaderGhostComponent {}
