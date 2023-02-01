import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-header',
  template: `
    <div vts-row [vtsGutter]="[16, 8]">
      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
          [vtsActions]="[actionCount]"
        >
        <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
          ></vts-card-meta>
        </vts-card>

        <ng-template #actionCount>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span style="width: fit-content;">1 day ago</span>
            <button vts-button vtsType="text" style="color: red;">
              <strong>Read more<i vts-icon vtsType="ArrowForward" style="margin-left: 2px; font-size: 14px;"></i></strong>
            </button>
          </div>
        </ng-template>

        <vts-card-header vtsTitle="something">
          <vts-card-header-extra>
            <button vts-button vtsType="text">
              <i vts-icon vtsType="Close"></i>
            </button>
          </vts-card-header-extra>
        </vts-card-header>
      </div>
      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
        >
          <vts-card-meta
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
          <vts-card-header vtsTitle="something">
          </vts-card-header>
        </vts-card>
      </div>
      
    </div>
  `
})
export class VtsDemoCardHeaderComponent {}
