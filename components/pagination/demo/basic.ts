import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-basic',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Disabled: &nbsp;
        <vts-switch [(ngModel)]="disabled"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Rounded: &nbsp;
        <vts-switch [(ngModel)]="rounded"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Outline: &nbsp;
        <vts-switch [(ngModel)]="outline"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Mini Mode: &nbsp;
        <vts-switch [(ngModel)]="mini"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Simple Mode: &nbsp;
        <vts-switch [(ngModel)]="simple"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Show size changer: &nbsp;
        <vts-switch [(ngModel)]="showSizeChanger"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Show quick jumper: &nbsp;
        <vts-switch [(ngModel)]="showQuickJumper"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Number of items: &nbsp;
        <vts-input-number
          style="width: 90px"
          style="width: 90px"
          [vtsMin]="1"
          [vtsStep]="1"
          [(ngModel)]="limit"
        ></vts-input-number>
      </span>
    </vts-space>
    <br />
    <br />
    <vts-pagination
      [vtsMini]="mini"
      [vtsDisabled]="disabled"
      [vtsRounded]="rounded"
      [vtsOutline]="outline"
      [vtsPageIndex]="1"
      [vtsTotal]="500"
      [vtsShowSizeChanger]="showSizeChanger"
      [vtsShowQuickJumper]="showQuickJumper"
      [vtsSimple]="simple"
      [vtsItemLimit]="limit"
    ></vts-pagination>
  `
})
export class VtsDemoPaginationBasicComponent {
  disabled: boolean = false;
  rounded: boolean = false;
  outline: boolean = false;
  mini: boolean = false;
  simple: boolean = false;
  showSizeChanger: boolean = false;
  showQuickJumper: boolean = false;
  limit: number = 5;
}
