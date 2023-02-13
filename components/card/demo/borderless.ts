import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-borderless',
  template: `
    <div style="padding: 16px">
      <vts-row class="container" [vtsGutter]="[32, 32]">
        <div vts-col vtsSpan="24" vtsXl="8">
          <vts-card vtsBorderless>
            <vts-card-header vtsTitle="Header Title">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta vtsTitle="Meta Title" vtsDescription="Meta Description">
              <vts-card-meta-avatar
                [vtsSize]="50"
                vtsText="xxs"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>

            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>

            <vts-card-footer vtsBordered>
              <a vts-typography style="color:inherit; margin-left: auto;">Read more ❯</a>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsSpan="24" vtsXl="8">
          <vts-card vtsBorderless>
            <vts-card-header vtsTitle="Header Title">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta vtsTitle="Meta Title" vtsDescription="Meta Description">
              <vts-card-meta-avatar
                [vtsSize]="50"
                vtsText="xxs"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>

            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>

            <vts-card-footer vtsBordered>
              <a vts-typography style="color:inherit; margin-left: auto;">Read more ❯</a>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsSpan="24" vtsXl="8">
          <vts-card vtsBorderless>
            <vts-card-header vtsTitle="Header Title">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta vtsTitle="Meta Title" vtsDescription="Meta Description">
              <vts-card-meta-avatar
                [vtsSize]="50"
                vtsText="xxs"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>

            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>

            <vts-card-footer vtsBordered>
              <a vts-typography style="color:inherit; margin-left: auto;">Read more ❯</a>
            </vts-card-footer>
          </vts-card>
        </div>
      </vts-row>
    </div>
  `,
  styles: [
    `
      .container {
        border: 1px solid #e0e0e0;
      }

      :host {
        display: block;
        padding: 24px;
      }
    `
  ]
})
export class VtsDemoCardBorderlessComponent {}
