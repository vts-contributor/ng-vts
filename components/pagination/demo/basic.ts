import { Component } from '@angular/core';
import { VtsPaginationSize } from '@ui-vts/ng-vts/pagination';

@Component({
  selector: 'vts-demo-pagination-basic',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Size: &nbsp;
        <vts-radio-group [(ngModel)]="size">
          <label vts-radio-button vtsValue="md">MD</label>
          <label vts-radio-button vtsValue="sm">SM</label>
        </vts-radio-group>
      </span>
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
    </vts-space>
    <br />
    <br />
    <vts-pagination 
      [vtsSize]="size" 
      [vtsDisabled]="disabled"  
      [vtsRounded]="rounded"  
      [vtsOutline]="outline"  
      [vtsPageIndex]="1" 
      [vtsTotal]="500"
      [vtsShowSizeChanger]="showSizeChanger"
      [vtsShowQuickJumper]="showQuickJumper"
      [vtsSimple]="simple"
    >
    </vts-pagination>
  `
})
export class VtsDemoPaginationBasicComponent {
  size: VtsPaginationSize = 'md';
  disabled: boolean = false;
  rounded: boolean = false;
  outline: boolean = false;
  simple: boolean = false;
  showSizeChanger: boolean = false;
  showQuickJumper: boolean = false;
}
