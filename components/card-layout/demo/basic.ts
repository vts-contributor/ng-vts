import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-layout-basic',
  template: `
    <vts-card
      vts-card-layout
      style="width:300px;"
      [vtsCardLayout]="'basic'"
      [vtsActions]="[actionDetail]"
    >
      <vts-card-meta
        vtsTitle="Card title"
        vtsDescription="Lorem ipsum dolor sit"
        [vtsAvatar]="avatarTemplate"
      ></vts-card-meta>
      <div>$15.548</div>
      <div>Expense Account</div>
    </vts-card>
    <ng-template #avatarTemplate>
      <vts-avatar
        vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></vts-avatar>
    </ng-template>
    <ng-template #actionDetail>
      <button vts-button vtsType="primary">See detail</button>
    </ng-template>
  `
})
export class VtsDemoCardLayoutBasicComponent {}
