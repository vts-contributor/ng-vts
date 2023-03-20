import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-basic',
  template: `
    <div style="padding: 16px">
      <vts-row [vtsGutter]="[32, 32]">
        <div vts-col vtsFlex="400px">
          <p>Using properties (With partial templates)</p>
          <vts-card>
            <vts-card-header vtsTitle="Header Title">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta vtsTitle="Meta Title" vtsDescription="Meta Description">
              <vts-card-meta-avatar [vtsSize]="50" vtsText="xxs"></vts-card-meta-avatar>
            </vts-card-meta>

            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>

            <vts-card-footer>
              <vts-space vtsPreset="4">
                <a *vtsSpaceItem vts-typography vtsType="link">Read more ❯</a>
                <a *vtsSpaceItem vts-typography vtsType="link">Save ❯</a>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <p>Using templates</p>
          <vts-card>
            <vts-card-header>
              <vts-card-header-title vtsColor="info">
                <i vts-icon vtsType="CarWash" style="font-size: 24px"></i>
                &nbsp;
                <u>Header Title</u>
              </vts-card-header-title>
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta>
              <vts-card-meta-title vtsWeight="semi-bold">
                <s>Meta Title</s>
              </vts-card-meta-title>
              <vts-card-meta-description vtsColor="error">
                <s>Meta Description</s>
              </vts-card-meta-description>
              <vts-card-meta-avatar [vtsSize]="50" vtsText="xxs"></vts-card-meta-avatar>
            </vts-card-meta>

            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>

            <vts-card-footer>
              <vts-space vtsPreset="4">
                <a *vtsSpaceItem vts-typography vtsType="link">Read more ❯</a>
                <a *vtsSpaceItem vts-typography vtsType="link">Save ❯</a>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
      </vts-row>
    </div>
  `
})
export class VtsDemoCardBasicComponent {}
