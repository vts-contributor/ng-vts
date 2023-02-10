import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-footer',
  template: `
    <div style="padding: 16px">
      <vts-row [vtsGutter]="[32, 32]">
        <div vts-col vtsFlex="400px">
          <vts-card>
            <vts-card-meta
              vtsTitle="Card title"
              vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati."
              vtsDirection="vertical"
              vtsAlign="center"
            >
              <vts-card-meta-avatar
                vtsShape="rounded"
                [vtsSize]="48"
                vtsIcon="Loyalty"
                style="background: #8F9294"
              ></vts-card-meta-avatar>
            </vts-card-meta>
            <vts-card-footer>
              <button vts-button vtsBlock vtsType="primary">Add new</button>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <span vts-typography vtsWeight="semi-bold">Card title</span>
            <br />
            <span>
              Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati.
            </span>
            <vts-card-footer vtsBordered>
              <vts-space vtsJustify="between" style="width: 100%">
                <span *vtsSpaceItem vts-typography vtsColor="secondary">1 days ago</span>
                <span *vtsSpaceItem vts-typography vtsType="link" vtsWeight="bold">
                  Read more >
                </span>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <span>
              Too much or too little spacing, as in the example below, can make things unpleasant
              for the reader.
            </span>
            <vts-card-footer vtsBordered>
              <vts-space vtsJustify="end" style="width: 100%" vtsPreset="3">
                <button *vtsSpaceItem vts-button>Close</button>
                <button *vtsSpaceItem vts-button vtsType="primary">Read more ></button>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
      </vts-row>
    </div>
  `
})
export class VtsDemoCardFooterComponent {}
