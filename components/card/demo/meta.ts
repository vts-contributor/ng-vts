import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-meta',
  template: `
    <vts-card
      style="width:300px;"
      [vtsCover]="coverTemplate"
      [vtsActions]="[actionSetting, actionEdit, actionEllipsis]"
    >
      <vts-card-meta
        vtsTitle="Card title"
        vtsDescription="This is the description"
        [vtsAvatar]="avatarTemplate"
      ></vts-card-meta>
    </vts-card>
    <ng-template #avatarTemplate>
      <vts-avatar
        vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></vts-avatar>
    </ng-template>
    <ng-template #coverTemplate>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </ng-template>
    <ng-template #actionSetting>
      <i vts-icon vtsType="Setting"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i vts-icon vtsType="Edit"></i>
    </ng-template>
    <ng-template #actionEllipsis>
      <i vts-icon vtsType="ViewHeadline"></i>
    </ng-template>
  `
})
export class VtsDemoCardMetaComponent {}
