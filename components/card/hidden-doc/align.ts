import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-align',
  template: `
    <div vts-row [vtsGutter]="8">
      <div  vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
          <button style="width: 100%;" vts-button vtsType="primary">Apply now</button>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'center'"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
          <button style="width: 100%;" vts-button vtsType="primary">Apply now</button>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'right'"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
          <button style="width: 100%;" vts-button vtsType="primary">Apply now</button>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
      </div>
    </div>
  `
})
export class VtsDemoCardAlignComponent {}
