import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-layout-align',
  template: `
    <div vts-row [vtsGutter]="8">
      <div  vts-col [vtsSpan]="8">
        <vts-card
          vts-card-layout
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
          [vtsActions]="[actionDetail]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
        <ng-template #actionDetail>
          <button vts-button vtsType="primary">See detail</button>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          vts-card-layout
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'center'"
          [vtsActions]="[actionDetail]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
        <ng-template #actionDetail>
          <button vts-button vtsType="primary">See detail</button>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          vts-card-layout
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'right'"
          [vtsActions]="[actionDetail]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
        <ng-template #actionDetail>
          <button vts-button vtsType="primary">See detail</button>
        </ng-template>
      </div>
    </div>
  `
})
export class VtsDemoCardLayoutAlignComponent {}
