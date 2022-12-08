import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-popconfirm-placement',
  template: `
    <div style="margin-left: 60px">
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="topLeft"
        vts-button
      >
        TL
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="top"
        vts-button
      >
        Top
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="topRight"
        vts-button
      >
        TR
      </button>
    </div>
    <div style="width: 60px; float: left;">
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="leftTop"
        vts-button
      >
        LT
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="left"
        vts-button
      >
        Left
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="leftBottom"
        vts-button
      >
        LB
      </button>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="rightTop"
        vts-button
      >
        RT
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="right"
        vts-button
      >
        Right
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="rightBottom"
        vts-button
      >
        RB
      </button>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="bottomLeft"
        vts-button
      >
        BL
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="bottom"
        vts-button
      >
        Bottom
      </button>
      <button
        vts-popconfirm
        vtsPopconfirmTitle="Are you sure delete this task?"
        (vtsOnConfirm)="confirm()"
        (vtsOnCancel)="cancel()"
        vtsPopconfirmPlacement="bottomRight"
        vts-button
      >
        BR
      </button>
    </div>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
        margin-bottom: 8px;
        width: 70px;
        text-align: center;
        padding: 0;
      }
    `
  ]
})
export class VtsDemoPopconfirmPlacementComponent {
  cancel(): void {
    this.vtsMessageService.info('click cancel');
  }

  confirm(): void {
    this.vtsMessageService.info('click confirm');
  }

  constructor(private vtsMessageService: VtsMessageService) {}
}
