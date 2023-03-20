import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-loading',
  template: `
    <vts-switch [(ngModel)]="loading"></vts-switch>
    <p></p>
    <vts-card [vtsLoading]="loading" style="width: 400px">
      <vts-card-header vtsTitle="Header Title">
        <vts-card-header-extra>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </vts-card-header-extra>
      </vts-card-header>
      <vts-card-meta vtsTitle="Meta Title" vtsDescription="Meta Description">
        <vts-card-meta-avatar
          [vtsLoading]="loading"
          [vtsSize]="50"
          vtsText="xxs"
        ></vts-card-meta-avatar>
      </vts-card-meta>

      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries
      </div>

      <vts-card-footer>
        <vts-space vtsPreset="4">
          <a *vtsSpaceItem vts-typography vtsType="link">Read more ❯</a>
          <a *vtsSpaceItem vts-typography vtsType="link">Save ❯</a>
        </vts-space>
      </vts-card-footer>
    </vts-card>
  `
})
export class VtsDemoCardLoadingComponent {
  loading = true;
}
