import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-loading',
  template: `
    <vts-switch [(ngModel)]="loading"></vts-switch>
    <vts-card style="width: 300px;margin-top: 16px" [vtsLoading]="loading">
      <vts-card-meta
        [vtsAvatar]="avatarTemplate"
        vtsTitle="Card title"
        vtsDescription="This is the description"
      ></vts-card-meta>
    </vts-card>
    <vts-card
      style="width: 300px;margin-top: 16px"
      [vtsActions]="[actionSetting, actionEdit, actionEllipsis]"
    >
      <vts-skeleton [vtsActive]="true" [vtsLoading]="loading" [vtsAvatar]="{ size: 'large' }">
        <vts-card-meta
          [vtsAvatar]="avatarTemplate"
          vtsTitle="Card title"
          vtsDescription="This is the description"
        ></vts-card-meta>
      </vts-skeleton>
    </vts-card>
    <ng-template #avatarTemplate>
      <vts-avatar
        vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></vts-avatar>
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
export class VtsDemoCardLoadingComponent {
  loading = true;
}
