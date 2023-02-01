import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-cover',
  template: `
    <div vts-row [vtsGutter]="8">
      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'cover'"
          [vtsActions]="[actionReadMore]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </ng-template>
        <ng-template #actionReadMore>
          <span>Readmore<i vts-icon vtsType="ArrowForward"></i></span>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'cover'"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'cover'"
          [vtsActions]="[actionTitle]"
        >
          <vts-card-meta
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </ng-template>
        <ng-template #actionTitle>
          <span style="margin-left: 24px; display: flex; align-self: start;">Card title</span>
        </ng-template>
      </div>
    </div>
  `, styles: [
    `
        .vtsicon {
          font-size: 0.8em;
          margin-left: 0.5em;
        }
    `
  ]
})
export class VtsDemoCardCoverComponent {}
